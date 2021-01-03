<template>
<!-- placeholder=`<Add a new ${elementName}>`-->
    <b-taginput
    type="is-primary"
        :placeholder="`Enter a ${elementName}`"
        v-model="selectedElements"
        :data="filteredOptionList"
        autocomplete
        field="label"
        icon="tag"
        @add="handleElementsUpdate"
        @remove="handleElementsUpdate"
        @typing="updateWordInput">
        <template slot="empty">No results found</template>
    </b-taginput>
</template>

<script>

export default {
  props: {
    elementName: {
      type: String,
      default: 'element',
    },
    elements: {
      type: Array,
    },
    selected: {
      type: Array
    }
  },
  data () {
    return {
      optionList: [],
      isSelectOnly: true,
      selectedElements: [],
      wordInput: '',
    };
  },

  computed: {
    filteredOptionList () {
      if (!this.elements) return [];

      const optionList = this.elements
        .filter(option => (
          option
            .toLowerCase()
            .indexOf(this.wordInput) >= 0
        ));
      if (this.wordInput) {
        return optionList.filter(e => !this.selectedElements
          .find(selectedElement => selectedElement === e));
      }
      return optionList;
    },
  },

  methods: {
    handleElementsUpdate () {
    /**
       * Handle element updates,
       * by getting a list of elements
       * if user adds or remove an element
      */
     // eslint-disable-next-line no-console
     this.$emit('onUpdateElement', this.selectedElements);
    },

    updateWordInput (wordInput) {
      this.wordInput = wordInput ? wordInput.toLowerCase() : '';
    },

  },
  mounted() {
    this.selectedElements = this.selected
  }
};
</script>
