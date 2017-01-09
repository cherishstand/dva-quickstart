import React from 'react'
import Header from '../components/common/Header'
import { Button, WhiteSpace, WingBlank, Popup, Toast } from 'antd-mobile'
import styles from './Photo.less';
const onFileChange = (event) => {
    if(event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataURL = e.target.result;
            if (!dataURL) {
               Toast.fail('图片获取失败');
               return;
            }
            document.getElementById('chooseImagePicker').style.backgroundImage = 'url('+ dataURL +')'
        }
        reader.readAsDataURL(file);
    }
    Popup.hide();
}
const PopupContent = () => {
    Popup.show(
        <div className={styles.popups}>
            <Button>
                拍照
                <input
                    type='file'
                    accept='image/jpg,image/jpeg,image/png,image/gif'
                    capture="camera"
                    onChange={onFileChange}
                />
            </Button>
            <WhiteSpace size='lg'/>
            <Button>
                从相册中选取
                <input
                    type='file'
                    accept='image/jpg,image/jpeg,image/png,image/gif'
                    onChange={onFileChange}
                />
            </Button>
            <WhiteSpace size='lg'/>
            <Button onClick={() => Popup.hide()}>取消</Button>
        </div>, { animationType: 'slide-up' }
    )
}
const Photo = ({
    location: { pathname }
}) => {
    return (
        <div>
            <Header path={pathname}/>
            <div className={styles.container}>
                <div>
                    <input type='text' placeholder='请选择客户' onFocus={() => console.log(1)}/>
                    <WhiteSpace size='lg' />
                    <input type='text' placeholder='请输入描述'/>
                    <WhiteSpace size='lg' />
                </div>
                <div style={{width: '56vw', height: '56vw'}} id='chooseImagePicker' className={styles.imagePicker}/>
                <WhiteSpace size="lg" />
                <Button type='primary' onClick={PopupContent}>添加图片</Button>
                <WhiteSpace size="lg" />
                <Button type='primary'>发送</Button>
            </div>
        </div>
    )
}
export default Photo
