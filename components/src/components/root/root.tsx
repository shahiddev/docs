import "@stencil/redux";
import { Component, Prop, h, Host } from "@stencil/core";
import { Store } from "@stencil/redux";
import { configureStore } from "../../store";

@Component({
    tag: "pulumi-root",
    styleUrl: "root.scss"
})
export class Root {

    @Prop({ context: "store" })
    store: Store;

    componentWillLoad() {
        this.store.setStore(configureStore());
    }

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
