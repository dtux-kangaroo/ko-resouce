/**
 * Custom module for quilljs to allow user to drag images from their file system into the editor
 * and paste images from clipboard (Works on Chrome, Firefox, Edge, not on Safari)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
import { message as Message } from "antd";
import { URL } from "@/api/index";
import { message } from 'antd';
export class ImageDrop {
  /**
   * Instantiate the module given a quill instance and any options
   * @param {Quill} quill
   * @param {Object} options
   */
  constructor(quill, options = {}) {
    // save the quill reference
    this.quill = quill;
    // bind handlers to this instance
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    // listen for drop and paste events
    this.quill.root.addEventListener("drop", this.handleDrop, false);
    this.quill.root.addEventListener("paste", this.handlePaste, false);
  }

  /**
   * Handler for drop event to read dropped files from evt.dataTransfer
   * @param {Event} evt
   */
  handleDrop(evt) {
    evt.preventDefault();
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset
          );
        }
      }
      this.readFiles(evt.dataTransfer.files, this.insert.bind(this));
    }
  }
  handlePaste(evt) {
    if (
      evt.clipboardData &&
      evt.clipboardData.items &&
      evt.clipboardData.items.length
    ) {
      this.readFiles(evt.clipboardData.items, dataUrl => {
        const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        if (userAgent.indexOf("Firefox") > -1) {
          const selection = this.quill.getSelection();
          if (selection) {
            // we must be in a browser that supports pasting (like Firefox)
            // so it has already been placed into the editor
          } else {
            // otherwise we wait until after the paste when this.quill.getSelection()
            // will return a valid index
            setTimeout(() => this.insert(dataUrl), 0);
          }
        } else {
          setTimeout(() => this.insert(dataUrl), 0);
        }
      });
    }
  }

  /**
   * Insert the image into the document at the current cursor position
   * @param {String} dataUrl  The base64-encoded image URI
   */
  insert(dataUrl) {
	this.uploadToServer(this.convertBase64UrlToBlob(dataUrl),(res)=>{
		const index =(this.quill.getSelection() || {}).index || this.quill.getLength();
	    this.quill.insertEmbed(index, "image", res[0], "user");
	})
    
  }
  convertBase64UrlToBlob = urlData => {
    //去掉url的头，并转换为byte
    const bytes = window.atob(urlData.split(",")[1]); //处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    ia.forEach((i, index) => {
      ia[index] = bytes.charCodeAt(index);
    });
    return new Blob([ia], {
      type: urlData
        .split(",")[0]
        .split(":")[1]
        .split(";")[0]
    });
  };
  /**
   * Extract image URIs a list of files from evt.dataTransfer or evt.clipboardData
   * @param {File[]} files  One or more File objects
   * @param {Function} callback  A function to send each data URI to
   */
  readFiles(files, callback) {
    // check each file for an image
    [].forEach.call(files, file => {
      if (
        !file.type.match(
          /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
        )
      ) {
        // file is not an image
        // Note that some file formats such as psd start with image/* but are not readable
        return;
      }
      // set up file reader
      const reader = new FileReader();
      reader.onload = evt => {
        callback(evt.target.result);
      };
      // read the clipboard item or file
      const blob = file.getAsFile ? file.getAsFile() : file;
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      }
    });
  }
  uploadToServer(file, callback) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("files", file,"image.png");
    xhr.open("post", URL.uploadUsingPost);
    xhr.withCredentials = true;
    xhr.responseType = "json";
    xhr.send(formData);
    let showLoading = Message.loading("图片上传中..", 0);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
		showLoading();
		const {data,message,success} = xhr.response;	
		if(success){
			callback(data);
		}else{
			Message.error(message)
		}	
      }
    };
  }
}
