import * as React from 'react';
import { Button,message as Message} from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from './ImageDrop.js'
import  './style.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { API,URL } from "@/api/index";

// 在quiil中注册quill-image-drop-module
Quill.register('modules/imageDrop', ImageDrop);

interface IProps{
  entId:string
}

interface IState{
  status: string,
  frameId:string,
  content: any,
}

export default class BusinessFrame extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);

    this.modules = {
      toolbar: {
        container:  [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'],
        ],
        handlers: {
          image: this.imageHandler
        }
      },
      imageDrop: true,
    }
  }
  modules: any
  quill:any
  showLoading:any
  state:IState={
    status: 'view', // view | edit
    content: '暂无内容',
    frameId:''
  }
  imageHandler =  () => {
    var toolbar = this.quill.editor.getModule('toolbar');
    var fileInput = toolbar.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change',  () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
                this.uploadToServer(fileInput.files[0], (res) => {
                  const {data,message,success} = res;
                    var range = this.quill.editor.getSelection();
                    if (range&&success) {
                        fileInput.value = null;
                        //  在当前光标位置插入图片
                        toolbar.quill.insertEmbed(range.index, 'image',data[0]);
                        //  将光标移动到图片后面
                        toolbar.quill.setSelection(range.index + 1);
                    }else{
                        Message.error(message)
                    }
                });
            }
        });
        toolbar.container.appendChild(fileInput);
    }
    fileInput.click();
 }
  componentDidMount () {
    this.showUsingGet()
  }
  uploadToServer(file, callback) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    formData.append('files', file);
    xhr.open('post',URL.uploadUsingPost);
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.send(formData);
    this.showLoading= Message.loading('图片上传中..', 0);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          this.showLoading();
          callback(xhr.response);
        }
    };
}
  showUsingGet = () => {
    API.showUsingGet({entId:this.props.entId}).then(res=>{
      const {data,message,success} = res;
      if(success){
        this.setState({
          content:data.frameworkDetails,
          frameId:data.id,
        })
      }else{
        Message.error(message)
      }
    })
  }
  updateUsingPost = () => {
    const {frameId,content} =this.state;
    API.updateUsingPost({entId:this.props.entId,frameId:frameId,frameworkDetails:content}).then(res=>{
      const {message,success} = res;
      if(success){
        Message.success('保存成功！');
        this.setState({ status: 'view' });
        this.showUsingGet()
      }else{
        Message.error(message)
      }
    })
  }
  handleEditClick = () => {
    this.setState({ status: 'edit' });
  }

  handleChange = (content: any) => { // 更改后使用编辑器的新内容调用。它将传递编辑器的HTML内容
    this.setState({
      content: content
    })
  }

  handleCancelClick = () => {
    this.setState({ status: 'view' });
  } 
  convertBase64UrlToBlob = (urlData) => { //去掉url的头，并转换为byte 
    const bytes = window.atob(urlData.split(',')[1]); //处理异常,将ascii码小于0的转换为大于0 
    const ab = new ArrayBuffer(bytes.length);
     const ia = new Uint8Array(ab); 
     ia.forEach((i, index) => {
      ia[index] = bytes.charCodeAt(index);
    });
    return new Blob([ia], { type: urlData.split(',')[0].split(':')[1].split(';')[0] });
  }
  handleSaveClick = () => {
    this.updateUsingPost()
  } 

  render(){
    const { status, content } = this.state;
    return (
      <div className="business-frame">
        <div className="top-box">
          <div className="title">业务框架展示</div>
          <div>
            <Button type="primary" disabled={status == 'edit' ? true : false} onClick={this.handleEditClick}>编辑</Button>
          </div>
        </div>
        <div className="bf-content">
          {status == 'view' && <div className="ql-container ql-snow show_view"><div className="ql-editor" dangerouslySetInnerHTML={{__html: content}}></div></div>}
          {status == 'edit' && <div>
            <ReactQuill 
              className="editor-wrap"
              value={content}
              ref = {(node)=>this.quill = node}
              onChange={this.handleChange}
              theme="snow"
              defaultValue=""
              placeholder="请输入文本"
              readOnly={false}
              modules={this.modules}
            />
            <div className="edit-bottom-btn">
              <Button style={{ marginLeft: 10 }} type="primary" onClick={this.handleSaveClick}>保存</Button>
              <Button onClick={this.handleCancelClick}>取消</Button>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}
