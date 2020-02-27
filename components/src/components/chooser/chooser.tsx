import { Component, h, Prop, State, Watch } from "@stencil/core";
import { Store, Unsubscribe } from "@stencil/redux";
import { AppState } from "../../store/state";
import { setLanguage, setK8sLanguage, setOS, setCloud } from "../../store/actions/preferences";

export type LanguageKey = "javascript" | "typescript" | "python" | "go" | "csharp" | "fsharp" | "visualbasic"
export type K8sLanguageKey = "typescript" | "yaml" | "typescript-kx"
export type OSKey = "macos" | "linux" | "windows"
export type CloudKey = "aws" | "azure" | "gcp"

export type ChooserType = "language" | "k8s-language" | "os" | "cloud";
export type ChooserKey = LanguageKey | K8sLanguageKey | OSKey | CloudKey;
export type ChooserOption = SupportedLanguage | SupportedK8sLanguage | SupportedOS | SupportedCloud;

interface SupportedLanguage {
    key: LanguageKey;
    name: string;
    preview: boolean;
}

interface SupportedK8sLanguage {
    key: K8sLanguageKey;
    name: string;
    preview: boolean;
}

interface SupportedOS {
    key: OSKey;
    name: string;
    preview: boolean;
}

interface SupportedCloud {
    key: CloudKey;
    name: string;
    preview: boolean;
}

export interface Choice {
    type: ChooserType;
    value: ChooserOption;
}

@Component({
    tag: "pulumi-chooser",
    styleUrl: "chooser.scss",
    shadow: false,
})
export class Chooser {
    private storeUnsubscribe: Unsubscribe;

    @Prop({ context: "store" })
    store: Store;

    @Prop({ mutable: true })
    type: ChooserType;

    @Prop({ mutable: true })
    options: string;

    @Prop({ mutable: true })
    selection: ChooserKey;

    @State()
    currentOptions: ChooserOption[] = [];

    // Dispatch functions.
    setLanguage: typeof setLanguage;
    setK8sLanguage: typeof setK8sLanguage;
    setOS: typeof setOS;
    setCloud: typeof setCloud;

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: AppState) => {
            const { preferences: { language, k8sLanguage, os, cloud } } = state;

            switch (this.type) {
                case "language": return { selection: language };
                case "k8s-language": return { selection: k8sLanguage };
                case "os": return { selection: os };
                case "cloud": return { selection: cloud };
                default: return {};
            }
        });

        this.store.mapDispatchToProps(this, { setLanguage, setK8sLanguage, setOS, setCloud });
        this.parseOptions();
    }

    componentDidUnload() {
        this.storeUnsubscribe();
    }

    @Watch("type")
    onType(_value: string) {
        this.parseOptions();
    }

    @Watch("options")
    onOptions(_value: string) {
        this.parseOptions();
    }

    @Watch("selection")
    onSelection(_value: LanguageKey) {
        this.parseOptions();
    }

    render() {
        return <ul>
            {
                this.currentOptions.map(opt => <li class={this.selection === opt.key ? "active" : ""}>
                    <a onClick={() => this.makeChoice(this.type, opt)}>
                        {opt.name} { opt.preview ? <span>PREVIEW</span> : ""}
                    </a>
                </li>)
            }
        </ul>;
    }

    private parseOptions() {
        this.currentOptions = [];

        if (this.type && this.options) {
            try {
                const keys: string[] = this.options.split(",").map(s => s.trim());
                this.mapOptions(this.type, keys);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    private mapOptions(type: ChooserType, keys: string[]): void {
        const options: ChooserOption[] = [];

        switch (type) {
            case "language": options.concat(this.supportedLanguages);
            case "k8s-language": options.concat(this.supportedk8sLanguages);
            case "os": options.concat(this.supportedOSs);
            case "cloud": options.concat(this.supportedClouds);
        }

        this.currentOptions = options.filter(opt => keys.includes(opt.key))
    }

    private makeChoice(type: ChooserType, choice: ChooserOption) {
        const key = choice.key;

        switch (type) {
            case "language": this.setLanguage(key as LanguageKey);
            case "k8s-language": this.setK8sLanguage(key as K8sLanguageKey);
            case "os": this.setOS(key as OSKey);
            case "cloud": this.setCloud(key as CloudKey);
        }
    }

    // The list of supported languages.
    private supportedLanguages: SupportedLanguage[] = [
        {
            key: "typescript",
            name: "TypeScript",
            preview: false,
        },
        {
            key: "javascript",
            name: "JavaScript",
            preview: false,
        },
        {
            key: "python",
            name: "Python",
            preview: false,
        },
        {
            key: "go",
            name: "Go",
            preview: true,
        },
        {
            key: "csharp",
            name: "C#",
            preview: true,
        },
        {
            key: "fsharp",
            name: "F#",
            preview: true,
        },
        {
            key: "visualbasic",
            name: "VB",
            preview: true,
        }
    ];

    // The list of supported Kubernetes languages.
    private supportedk8sLanguages: SupportedK8sLanguage[] = [
        {
            key: "typescript",
            name: "TypeScript",
            preview: false,
        },
        {
            key: "typescript-kx",
            name: "TypeScript KX",
            preview: false,
        },
        {
            key: "yaml",
            name: "YAML",
            preview: false,
        },
    ];

    // The list of supported operating systems.
    private supportedOSs: SupportedOS[] = [
        {
            key: "macos",
            name: "macOS",
            preview: false,
        },
        {
            key: "windows",
            name: "Windows",
            preview: false,
        },
        {
            key: "linux",
            name: "Linux",
            preview: false,
        },
    ];

    // The list of supported clouds.
    private supportedClouds: SupportedCloud[] = [
        {
            key: "aws",
            name: "AWS",
            preview: false,
        },
        {
            key: "azure",
            name: "Azure",
            preview: false,
        },
        {
            key: "gcp",
            name: "GCP",
            preview: false,
        },
    ];
}
