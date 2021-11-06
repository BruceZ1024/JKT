<template>
  <div v-if="isExternalIcon" :style="styleExternalIcon" class="svg-external-icon svg-icon"
       v-bind="$attrs"/>
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
import { computed } from 'vue';
import { isExternal } from '@/utils/validate';

export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const isExternalIcon = computed(() => isExternal(props.iconClass));
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      }
      return 'svg-icon';
    });
    const styleExternalIcon = computed(() => {
      console.log(1);
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
      };
    });
    return {
      isExternalIcon,
      iconName,
      svgClass,
      styleExternalIcon,
    };
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
