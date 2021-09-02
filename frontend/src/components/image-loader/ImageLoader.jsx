import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

class ImageLoader extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const { getBase64 } = this.props;
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const { handleChange, fileList } = this.props;
    const { length } = fileList;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          maxCount="4"
          customRequest={this.dummyRequest}
          accept=".png,.jpg,.jpeg"
          listType="picture-card"
          fileList={length === 0 ? [] : fileList}
          onPreview={this.handlePreview}
          onChange={handleChange}
        >
          {length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default ImageLoader;
