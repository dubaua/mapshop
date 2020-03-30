<template>
  <div class="constructor">
    <div class="container">
      <div class="row">
        <div class="col col-xs-12 col-md-6">
          <div class="constructor__poster poster">
            <div class="poster__map-container" id="constructor-map"></div>
            <div class="poster__text">
              <div class="poster__title">
                {{ form.text.title }}
              </div>
              <div class="poster__divider">
                {{ form.text.divider }}
              </div>
              <div class="poster__subtitle">
                {{ form.text.subtitle }}
              </div>
            </div>
          </div>
        </div>
        <div class="col col-xs-12 col-md-6">
          <form class="constructor__form form" @submit.prevent="handleForm">
            <div class="form__section">
              <div class="form__section-title">1. Локация</div>
              <fieldset class="form__item">
                <label class="form__label">
                  Введите место
                  <input
                    type="text"
                    class="form__input"
                    v-model="searchInput"
                  />
                </label>
              </fieldset>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите стиль
                </legend>
                <div class="radio" v-for="style in mapStyles" :key="style.name">
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="style"
                      :value="style.value"
                      :id="style.name"
                      :checked="style.value === form.style"
                      @change="onStyleChange"
                    />
                    {{ style.label }}
                  </label>
                </div>
              </fieldset>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите тему
                </legend>
                <div class="radio" v-for="theme in mapThemes" :key="theme.name">
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="theme"
                      :value="theme.value"
                      :id="theme.name"
                      :checked="theme.value === form.theme"
                      @change="onThemeChange"
                    />
                    {{ theme.label }}
                  </label>
                </div>
              </fieldset>
            </div>
            <div class="form__section">
              <div class="form__section-title">2. Текст</div>
              <fieldset class="form__item">
                <label class="form__label">
                  Введите заголовок
                  <input
                    type="text"
                    class="form__input"
                    v-model="form.text.title"
                  />
                </label>
              </fieldset>
              <fieldset class="form__item">
                <label class="form__label">
                  Введите разделитель
                  <input
                    type="text"
                    class="form__input"
                    v-model="form.text.divider"
                  />
                </label>
              </fieldset>
              <fieldset class="form__item">
                <label class="form__label">
                  Введите подзаголовок
                  <input
                    type="text"
                    class="form__input"
                    v-model="form.text.subtitle"
                  />
                </label>
              </fieldset>
            </div>
            <div class="form__section">
              <div class="form__section-title">3. Размер</div>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите размер плаката
                </legend>
                <div
                  class="radio"
                  v-for="size in posterSizes"
                  :key="size.value"
                >
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="size"
                      :value="size.value"
                      :id="size.value"
                      :checked="size.value === form.size"
                      @change="onSizeChange"
                    />
                    {{ size.label }}
                  </label>
                </div>
              </fieldset>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите ориентацию
                </legend>
                <div class="radio">
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="orientation"
                      :value="0"
                      id="portrait"
                      v-model="form.orientation"
                    />
                    Портрет
                  </label>
                </div>
                <div class="radio">
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="orientation"
                      :value="1"
                      id="1"
                      v-model="form.orientation"
                    />
                    Альбом
                  </label>
                </div>
              </fieldset>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите материал
                </legend>
                <div
                  class="radio"
                  v-for="material in posterMaterials"
                  :key="material.name"
                >
                  <label class="radio__label" :title="material.description">
                    <input
                      type="radio"
                      class="radio__input"
                      name="material"
                      :value="material.value"
                      :id="material.name"
                      :checked="material.value === form.material"
                      @change="onMaterialChange"
                    />
                    {{ material.label }}
                  </label>
                </div>
              </fieldset>
              <fieldset class="form__item">
                <legend class="form__label">
                  Выберите рамку
                  <span v-if="form.frame > 0">
                    — {{ posterFrames[form.frame].price }} руб.
                  </span>
                </legend>
                <div
                  class="radio"
                  v-for="frame in posterFrames"
                  :key="frame.name"
                >
                  <label class="radio__label">
                    <input
                      type="radio"
                      class="radio__input"
                      name="frame"
                      :value="frame.value"
                      :id="frame.value"
                      :checked="frame.value === form.frame"
                      @change="onFrameChange"
                    />
                    {{ frame.label }}
                  </label>
                </div>
              </fieldset>
            </div>
            <button
              class="form__button button button--primary"
              @submit.prevent="handleForm"
            >
              Добавить в корзину {{ posterPrice }} ₽
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Constructor",
  data() {
    return {
      form: {
        mapData: {
          lat: 55,
          lng: 37,
          zoom: 16
        },
        searchQuery: null,
        style: 0,
        theme: 0,
        size: 0,
        orientation: 0,
        material: 0,
        frame: 0,
        text: {
          title: "Челябинск",
          divider: "Россия",
          subtitle: "55.164°N / 61.436°E"
        }
      },
      mapStyles: [
        {
          value: 0,
          name: "scandi",
          label: "Scandi"
        },
        {
          value: 1,
          name: "asphalt",
          label: "Asphalt"
        },
        {
          value: 2,
          name: "blue",
          label: "Blue"
        }
      ],
      mapThemes: [
        {
          value: 0,
          name: "classic",
          label: "Классицизм"
        },
        {
          value: 1,
          name: "minimal",
          label: "Минимализм"
        },
        {
          value: 2,
          name: "shok-content",
          label: "Авангард"
        }
      ],
      posterSizes: [
        {
          value: 0,
          label: "30x40см",
          price: 0
        },
        {
          value: 1,
          label: "50x70см",
          price: 600
        },
        {
          value: 2,
          label: "70x100см",
          price: 3000
        }
      ],
      posterMaterials: [
        {
          value: 0,
          name: "paper",
          description:
            "Фотобумага музейного качества, матовая с антибликовым покрытием",
          label: "Бумага",
          price: 0
        },
        {
          value: 1,
          name: "canvas",
          description: "Хороший холст",
          label: "Холст на подрамнике",
          price: 1000
        }
      ],
      posterFrames: [
        {
          value: 0,
          name: "withot-frame",
          price: 0,
          label: "Без рамки"
        },
        {
          value: 1,
          name: "black",
          price: 900,
          label: "Черная"
        },
        {
          value: 1,
          name: "white",
          price: 900,
          label: "Белая"
        }
      ],
      startPrice: 1990,
    };
  },
  methods: {
    onSizeChange({ target }) {
      this.form.size = parseFloat(target.value);
    },
    onStyleChange({ target }) {
      this.form.style = parseFloat(target.value);
    },
    onThemeChange({ target }) {
      this.form.theme = parseFloat(target.value);
    },
    onMaterialChange({ target }) {
      this.form.material = parseFloat(target.value);
    },
    onFrameChange({ target }) {
      this.form.frame = parseFloat(target.value);
    },
    handleForm() {
      console.log("handleForm", this.formData);
    },
    useUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.form.mapData.lat = position.coords.latitude;
          this.form.mapData.lng = position.coords.longitude;
          console.log(position.coords.latitude, position.coords.longitude);
        });
      }
    }
  },
  computed: {
    searchInput: {
      get() {
        return this.form.searchQuery;
      },
      set(newVal) {
        this.form.searchQuery = newVal;
      }
    },
    posterPrice() {
      const sizePrice = this.posterSizes[this.form.size].price;
      const materialPrice = this.posterMaterials[this.form.material].price;
      const framePrice = this.posterFrames[this.form.frame].price;
      return this.startPrice + sizePrice + materialPrice + framePrice;
    },
    formData() {
      return {
        lat: this.form.mapData.lat,
        lng: this.form.mapData.lng,
        zoom: this.form.mapData.zoom,
        style: this.form.style,
        theme: this.form.theme,
        size: this.form.size,
        orientation: this.form.orientation,
        material: this.form.material,
        frame: this.form.frame,
        text: {
          title: this.form.title,
          divider: this.form.divider,
          subtitle: this.form.subtitle
        }
      };
    }
  },
  mounted() {
    // TODO определять местоположение юзера, отражать на карте и в тексте

    L.mapbox.accessToken =
      "pk.eyJ1IjoicHJhbWF0dGkiLCJhIjoiY2syb2hiOHJoMDVzYTNtcHBocnB0bnRhaSJ9.zYNWx4wkEu8jXQW4PrpNRQ";
    L.mapbox
      .map("constructor-map", "mapbox.streets")
      .setView(
        [this.form.mapData.lat, this.form.mapData.lng],
        this.form.mapData.zoom
      );
      
    this.useUserLocation();
  }
};
</script>

<style lang="scss">
.constructor {
  margin-top: 46px;
  &__poster {
  }
  &__form {
  }
}
.poster {
  width: 450px;
  height: 600px;
  background-color: darkgrey;
  margin: auto;
  position: relative;

  &__map-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  &__text {
    position: absolute;
    bottom: 0;
    text-align: center;
    left: 0;
    right: 0;
  }
  &__title {
  }
  &__divider {
  }
  &__subtitle {
  }
}
.form {
  &__section {
  }
  &__section-title {
  }
  &__item {
  }
  &__label {
  }
  &__input {
  }
  &__button {
  }
}
.button {
  &--primary {
  }
}
</style>
