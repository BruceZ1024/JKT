import Clipboard from 'clipboard';
import { Toast } from 'vant';
export function copyToClipboard(e, text) {
  console.log(e.target)
  let clipboard;
  if (e && e.target.localName == "svg"){
    clipboard = new Clipboard(e.target.parentNode, { text: () => text })
  } else {
    clipboard = new Clipboard(e.target, { text: () => text })
  }
  
  clipboard.on('success', e => {
    // 释放内存
    Toast.success('Copied to your Clipboard!');
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    // 不支持复制
    Toast.fail('Failed to copy to your Clipboard!');
    // 释放内存
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(e)
}