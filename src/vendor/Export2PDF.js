/**
 * @author zhudying
 * @description pdf页面导出函数
 * @function getPdf
 * @param {string} htmlTitle  导出的文件名
 * @param {string} elements   导出html的id
 */
import { Loading } from "element-ui";

import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export function getPdf (htmlTitle, elements) {
  let title = htmlTitle;
  let element = elements;
  //pdf分页
  setTimeout(() => {
    var loadingInstance = Loading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    html2Canvas(element, {
      allowTaint: true,
      scale: 2,
      async: false
    }).then(canvas => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / 592.28) * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = (592.28 / contentWidth) * contentHeight;
      console.log(canvas.toDataURL, "canvas.toDataURL");
      var pageData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new JsPDF("", "pt", "a4");
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(title + ".pdf");
    });
    loadingInstance.close();
  }, 100);
}
