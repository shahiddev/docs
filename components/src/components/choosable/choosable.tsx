import { Component, h, Prop } from '@stencil/core';
import { Store, Unsubscribe } from "@stencil/redux";
import { AppState } from "../../store/state";
import { ChooserType, ChooserKey } from "../chooser/chooser";

@Component({
    tag: 'pulumi-choosable',
    styleUrl: 'choosable.scss',
    shadow: false
})
export class Choosable {
    private storeUnsubscribe: Unsubscribe;

    @Prop({ context: "store" })
    store: Store;

    @Prop({ mutable: true })
    type: ChooserType;

    @Prop({ mutable: true })
    value: ChooserKey;

    @Prop({ mutable: true })
    selection: ChooserKey;

    componentWillLoad() {

        this.storeUnsubscribe = this.store.mapStateToProps(this, (state: AppState) => {
            const { preferences: { language, k8sLanguage, os, cloud } } = state;

            switch (this.type) {
                case "language": return { selection: language };
                case "k8s-language": return { selection: k8sLanguage };
                case "os": return { selection: os };
                case "cloud": return { selection: cloud };
            }
        });
    }

    componentDidUnload() {
        this.storeUnsubscribe();
    }

    render() {
        return (
            <div class={this.selection === this.value ? "active" : ""}>
                <slot></slot>
            </div>
        );
    }
}
