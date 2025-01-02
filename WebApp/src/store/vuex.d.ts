declare module 'vuex' {
    import { Store } from 'vuex/types/index'
    export * from 'vuex/types/index'
    export const mapActions: any;
    export const mapGetters: any;
    export default Store
}