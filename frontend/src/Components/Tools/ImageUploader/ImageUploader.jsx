import "./ImageUploader.css";
import React from "react";
import {
  Button,
  Divider,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

function ImageUploader(props) {
  const inputFileRef = React.useRef(null);
  const imageURL = props.imageURL;
  const onChangeFile = props.onChangeFile;

  return (
    <Segment placeholder>
      {imageURL && (
        <Image
          centered
          size="medium"
          src={"http://" + process.env.REACT_APP_SERVER_URL + imageURL}
          alt="uploaded"
        />
      )}
      {!imageURL && (
        <Header icon>
          <Icon name="file image" />
          Продукт повинен мати фото
        </Header>
      )}
      <Divider />
      <Button primary onClick={() => inputFileRef.current.click()}>
        {imageURL ? "Замiнити фото" : "Завантажити фото"}
      </Button>
      <input ref={inputFileRef} type="file" onChange={onChangeFile} hidden />
    </Segment>
  );
}

export default ImageUploader;
