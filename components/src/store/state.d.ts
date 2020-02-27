import { LanguageKey, K8sLanguageKey, OSKey, CloudKey } from "../components/chooser/chooser";

export interface PreferencesState {
    language: LanguageKey;
    k8sLanguage: K8sLanguageKey
    os: OSKey;
    cloud: CloudKey,
}

export interface AppState {
    preferences: PreferencesState
}
