<template>
  <div id="my-container">
    <div class="my-3">
      <!-- Filter button -->
      <b-button class="filter-btn" id="popover-reactive-1" variant="primary" ref="button" :loading="isLoading">
        <b-icon pack="fas" icon="filter" size="is-small" custom-class=""></b-icon>
        <span>Filters</span>
        </b-button>
    </div>

    <b-popover
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <!--Popover title / header-->
      <template v-slot:title>
        <header class="card-header">
          <p class="card-header-title">Filters</p>
        </header>
      </template>
      <!--Popover content-->
      <div>
        <div class="card-content">
          <SmartFiltersTabs
            :isLoading="isLoading"
            :options="options"
            :filters="filters"
            @on-reset-options="onResetOptions"
            @on-filter-data="onFilterData"
          ></SmartFiltersTabs>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import SmartFiltersTabs from "@/components/SmartFiltersTabs.vue";
Vue.use(BootstrapVue);
export default {
  components: {
    SmartFiltersTabs
  },
  props: {
    options: {
      type: Object,
    },
     filters: {
      type: Object,
    },
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      popoverShow: false

    };
  },
  methods: {
    onClose() {
      this.popoverShow = false;
      //pass filters to App
    },
    onOk() {},
    onShow() {
      // This is called just before the popover is shown
      // Reset our popover form variables
      // eslint-disable-next-line no-console
    },
    onShown() {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      // this.focusRef(this.$refs.input1);
    },
    onHidden() {
      // Called just after the popover has finished hiding
      // Bring focus back to the button
      // this.focusRef(this.$refs.button);
    },
    focusRef(ref) {
      // Some references may be a component, functional component, or plain element
      // This handles that check before focusing, assuming a `focus()` method exists
      // We do this in a double `$nextTick()` to ensure components have
      // updated & popover positioned first
      this.$nextTick(() => {
        this.$nextTick(() => {
          (ref.$el || ref).focus();
        });
      });
    },
    onFilterData() {
       // eslint-disable-next-line no-console
      //console.log('emit in filters')
      this.$emit("on-filter-data");
    },
    onResetOptions() {
      this.$emit("on-reset-options");
    }

  }
};
</script>

<style lang="scss">
.filter-btn {
  color: #fff !important;
  position: fixed !important;
  top: 115px;
  left: 0 !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
  background: rgb(140, 74, 255) !important;
  /* opacity: 0.8; */
  text-transform: capitalize !important;
  /* background: rgba(0, 0, 0, 0.3); */
  z-index: 1031;
  border-radius: 0 8px 8px 0 !important;
  text-align: center !important;
}

.filter-btn:focus,
.filter-btn.focus,
.filter-btn:hover {
  opacity: 1;
  color: #fff;
  background: linear-gradient(90deg, #ab47bc, #8e24aa);
  border-color: #fff;
}

.popover {
  max-width: 300px;
  width: 100%;
  z-index: 1031;
  padding: 0;
  line-height: 1.5em;
  background: #fff;
  border: none;
  border-radius: 3px;
  color: #555 !important;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);

  .card-content {
    padding: 0 12px;
    .tab-content {
      padding-left: 0;
      padding-right: 0;

      label {
        font-size: 14px;
        color: #999999;
      }
    }

    .tabs {
      font-size: 10px;
      font-weight: 500;

      ul {
        border-bottom: none;
      }

      a {
        color: #555 !important;
      }

      li {
        &.is-active {
          a {
            color: #7957d5 !important;
            border-bottom: 2px solid #7957d5 !important;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>