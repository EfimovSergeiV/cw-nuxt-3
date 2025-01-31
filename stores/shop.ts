import { defineStore } from 'pinia'


interface Product {
  id: number
  vcode: string
  name: string
  rating: any
  price: number | null,
  status: string
  preview_image: string
  description: string,
  category: string | null,
  propstrmodel: any
  quantity: number
}

interface Client {
  shop_id: number | null
  region_code: string | null
  person:string | null
  phone: string | null
  email: string | null
  comment: any | null
  delivery: boolean
  adress: string | null
  
  city: string | null
  contact: string | null

  entity: boolean
  company: string | null
  legaladress: string | null
  inn: string | null
  kpp: string | null
  okpo: string | null
  bankname: string | null
  currentacc: string | null
  corresponding: string | null
  bic: string | null
}

interface ProductImages {
  id: number,
  image: string,
}


interface SimpleProduct {
  prod_type: string,
  id: number,
  name: string,
  price: number,
  quantity: number
}


export const useShopStore = defineStore('ShopStore', {
  /// Хранение данных о магазинах
  state: () => ({
    shop: null,
    shops: [],
    selectedCity: null, /// Для того чтоб в ShopMaps не скидывался выбранный город при смене роута
    writeUsModal: false
  }),
  actions: {
    selectShop(shop: any) {
      this.shop = shop
    },
    // selectCityMaps(city: any) {
    //   this.city = city
    // },
    writeShops(shops: any) {
      this.shops = shops
      this.shop = shops.value[0]
    },
    showWriteUsModal() {
      this.writeUsModal = !this.writeUsModal
    },
  },
})

export const useProductsStore = defineStore('ProductsStore', {
  /// Хранение данных о товарах
  state: () => ({
    simpleCart: [] as SimpleProduct[], /// Упрощённая корзина для заказа в один клик, а позже для основной
    cart: [] as Product[],  /// Товары в корзине
    comp: [] as Product[],  /// Товары в сравнении
    like: [] as Product[],  /// Товары в избраннном
    viewed: [] as Product[],  /// Ранее просмотренные товары
    requestPrice: null as Product | null, /// Модальное на запрос стоимости товара
    cartAlert: false, /// Уведомление о добавленном товаре (модальное окно)
    cartAlertBlock: false,  /// Уведомление о добавленном товаре (модальное окно)
    productImages: null as ProductImages[] | null, /// Отображение изображений товаров
  }),
  getters: {
    productInSimpleCart: (state) => (id: number) => {
      return state.simpleCart.find((item) => item.id === id);
    },


    productInCart: (state) => (id: number) => {
      return state.cart.find((item) => item.id === id);
    },
    productInComp: (state) => (id: number) => {
      return state.comp.find((item) => item.id === id);
    },
    productInLike: (state) => (id: number) => {
      return state.like.find((item) => item.id === id);
    },
    cartTotalPrice: (state) => {
      let result = 0
      state.cart.forEach((el) => (result += el.only_price * el.quantity)) /// Проверка на null
      return result
    },
  },
  actions: {
    /// Добавление или удаление товаров

    restoreState( data:any ) {
      /// Восстановление состояния сессии пользователя

      if (data){
        this.comp = data.comp
        this.like = data.like
        this.viewed = data.viewed        
      } else {
        this.comp = []
        this.like = []
        this.viewed = []
      }


    },

    /// Добавление товара в корзину для заказа в один клик
    addSimpleProduct(product: any) {
      if (product.prod_type === 'ext') {
        this.simpleCart.push(product)
      }
      // const productInCart = this.oneclickCart.find((item) => item.id === product.id)
      // if (productInCart) {
      //   productInCart.quantity++
      // } else {
      //   this.oneclickCart.push(product)
      // }
    },
    quantitySimpleProduct(product: any, prod_type: string, action: string) {

      const simpleProduct = this.simpleCart.find((item) => item.id === product.id && item.prod_type === prod_type)

      if (simpleProduct) {
        if ( action === 'del') {
          simpleProduct.quantity--
        } else {
          simpleProduct.quantity++
        }
      }

    },

    deleteSimpleProduct(product: any) {
      const index = this.simpleCart.findIndex((item) => item.id === product.id)
      this.simpleCart.splice(index, 1)
    },

    addProduct(target: string, payload: Product) {
      const product: Product = { ...payload}
      
      /// Добавление или удаление товара в корзину
      if (target === 'cart') {
        product.quantity = 1
        const index = this.cart.findIndex((item) => item.id === product.id)
        if (index === -1) {

          this.cart.push(product)

          if (!this.cartAlertBlock) {
            setTimeout(() => {
              this.cartAlert = !this.cartAlert
            }, 400);
          }

        } else {
          this.cart.splice(index, 1)
        }
      }
      /// Добавление или удаление товара в сравнение
      if (target === 'comp') {
        const index = this.comp.findIndex((item) => item.id === product.id)
        if (index === -1){
          this.comp.push(product)
        } else {
          this.comp.splice(index, 1)
        }
      }
      /// Добавление или удаление товара в избранные
      if (target === 'like') {
        const index = this.like.findIndex((item) => item.id === product.id)
        if (index === -1){
          this.like.push(product)
        } else {
          this.like.splice(index, 1)
        }
      }
    },
    /// Изменение кол-ва товаров в корзине
    changeQuantity( product: any, action: string ) {
      const cartProduct = this.cart.find((item) => item.id === product.id)
      if ( cartProduct &&  cartProduct.quantity > 1 && action === 'del' ) {
        cartProduct.quantity--
      } else if ( cartProduct && action === 'add') {
        cartProduct.quantity++
      } else if ( cartProduct && action === 'opt_add') {
        cartProduct.quantity = cartProduct.quantity + product.opt_quantity
      } else if ( cartProduct && cartProduct.quantity > 1 && action === 'opt_del') {
        cartProduct.quantity = cartProduct.quantity - product.opt_quantity
      }
    },
    manualChangeQuantity( product: any, quantity: number ) {
      const cartProduct = this.cart.find((item) => item.id === product.id)
      if ( cartProduct ) {
        cartProduct.quantity = quantity
      }
    },

    clearCartProducts() {
      this.cart = []
    },
    showCartModal() {
      this.cartAlert = !this.cartAlert
    },
    addRequestPrice(product: any) {
      this.requestPrice = product
    },
    clearRequestPrice() {
      this.requestPrice = null
    },
    showProductImages(images: any) {
      this.productImages = images
    },
    clearProductImages() {
      this.productImages = null
    }
  },
})


export const useClientStore = defineStore('ClientStore', {
  /// Хранение данных о клиенте
  state: () => ({
    client: {
      shop_id: null,
      region_code: null,
      person: null,
      phone: null,
      email: null,
      comment: null,
      delivery: false,
      delivery_adress: null,
      adress: null,

      city: 'Москва',
      contact: null,
      entity: false,
      company: null,
      legaladress: null,
      inn: null,
      kpp: null,
      okpo: null,
      bankname: null,
      currentacc: null,
      corresponding: null,
      bic: null,
    } as Client,

    locationModal: false,
    registerModal: false,
    loginModal: false,
    order: null,        /// Последний сделаный заказ, если заказан в этой сессии (завязан на модальку заказа)
    orderHistory: null, /// История заказов клиентов, получать из API
    viewport: 'grid', /// Grid или row отображение товаров в каталоге
  }),
  actions: {
    saveClientData(data: any) {
      this.client = data
      this.client.comment = null
    },
    async sendCoordinates(coordinates: any) {
      const config = useRuntimeConfig()
      const { data }: any = await useFetch(`${ config.public.baseURL }coordinates/`, {
        method: 'POST',
        body: coordinates
      });
      if ( data.value ) {
        this.client.city = data.value.at(1)
      }
    },
    async getLocateFromIP() {
      // const config = useRuntimeConfig()
      // const city: any = await $fetch(`${ config.public.baseURL }location/`)
      // this.client.city = city
    }
  },
})



interface Toasts {
  id: number
  type: string
  text: string
}

export const useNotificationsStore = defineStore('NotificationsStore', {
  /// Уведомления и всплывающие окна 
  state: () => ({
    filterComponent: false,
    toasts: [] as Toasts[],
  }),
  actions: {
    statusFilterComponent() {
      this.filterComponent = !this.filterComponent
    },
    pushToast(toast: any) {
      this.toasts.push(toast)
      setTimeout(() => {
        this.toasts.shift()
      }, 5000 )
    },
    removeToast(id: number) {
      const toast = this.toasts.findIndex((item) => item.id === id)
      this.toasts.splice(toast, 1)
    }
  },
})