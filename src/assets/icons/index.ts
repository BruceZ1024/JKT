import SvgIcon from '@/components/SvgIcon.vue';

const req = require.context('@/assets/icons/svg', false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
requireAll(req);

export default function registerSvgIconComp(app: any): void {
  app.component('SvgIcon', SvgIcon);
}
