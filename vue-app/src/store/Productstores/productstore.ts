import axios from 'axios';
import { Module } from 'vuex';

// Define type of the categories
interface Category {
    id: number,
    title: string,
    image: string
}

interface NewProduct {
    id: number;
    title: string;
    subtitle: string,
    image: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    discount: number;
    image: string;
    category: string;
    quantity: number
}

interface otherProducts {
    id: number;
    product: string;
}

// Define the type of state
interface ProductAndTypes {
    categories: Category[]
    newProducts: NewProduct[]
    products: Product[],
    bestSellingProducts: Product[],
    recommendProducts: otherProducts[]
}

// Initial state
const state: ProductAndTypes = {
    categories: [],
    newProducts: [],
    products: [],
    bestSellingProducts: [],
    recommendProducts: []
}

// Define mutaitons
const mutations = {
    SET_CATEGORIES(state: ProductAndTypes, payload: ProductAndTypes) {
        state.categories = payload.categories
    },

    SET_NEWPRODUCTS(state: ProductAndTypes, payload: ProductAndTypes) {
        state.newProducts = payload.newProducts
    },

    SET_PRODUCTS(state: ProductAndTypes, payload: ProductAndTypes) {
        state.products = payload.products
    },

    SET_BESTPRODUCTS(state: ProductAndTypes, payload: ProductAndTypes) {
        state.bestSellingProducts = payload.bestSellingProducts
    },

    SET_OTHERPRODUCTS(state: ProductAndTypes, payload: ProductAndTypes) {
        state.recommendProducts = payload.recommendProducts
    }
}

// Define actions
const actions = {
    async fetchCategories({ commit }: any) {
        try {
            await axios.get('http://localhost:3000/categories').then((res) => {
                commit('SET_CATEGORIES', { categories: res.data });
            })
        } catch (error) {
            console.error('Error fetching categories', error)
        }
    },

    async fetchNewProducts({ commit }: any) {
        try {
            await axios.get('http://localhost:3000/newProducts').then((res) => {
                commit('SET_NEWPRODUCTS', { newProducts: res.data });
            })
        } catch (error) {
            console.error('Error fetching New Products', error)
        }
    },

    async fetchProducts({ commit }: any) {
        try {
            await axios.get('http://localhost:3000/products').then((res) => {
                commit('SET_PRODUCTS', { products: res.data });
            })
        } catch (error) {
            console.error('Error fetching Products', error)
        }
    },

    async fetchBestSellingProducts({ commit }: any) {
        try {
            await axios.get('http://localhost:3000/bestSellingProducts').then((res) => {
                console.log(res.data)
                commit('SET_BESTPRODUCTS', { bestSellingProducts: res.data });
            })
        } catch (error) {
            console.error('Error fetching best selling Products', error)
        }
    },

    async fetchOtherProducts({ commit }: any) {
        try {
            await axios.get('http://localhost:3000/recommendedProducts').then((res) => {
                console.log('rp: ', res.data)
                commit('SET_OTHERPRODUCTS', { recommendProducts: res.data})
            })
        } catch (error) {
            console.error('Error fetching in recommended products', error)
        }
    }
}

// Define getters
const getters = {
    getCategories: (state: ProductAndTypes) => state.categories,
    getNewProducts: (state: ProductAndTypes) => state.newProducts,
    getProducts: (state: ProductAndTypes) => state.products,
    getFruitProducts: (state: ProductAndTypes) => state.products.filter((product: Product) => product.category === 'Fruits & Veges'),
    getJuiceProducts: (state: ProductAndTypes) => state.products.filter((product: Product) => product.category === 'Juices'),
    getBestSellingProducts: (state: ProductAndTypes) => state.bestSellingProducts,
    getRecommendedProducts: (state: ProductAndTypes) => state.recommendProducts
}

const productsStore: Module<ProductAndTypes, any> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

export default productsStore;