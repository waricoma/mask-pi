import React from 'react'
import { Button } from '@material-ui/core';
import Widget from './shared/Widget';
import { MaskImage } from '../entity/MaskImage';

type UploadWidgetProps = {
  onUploadImage: (maskImage: MaskImage) => void
}

const UploadWidget: React.FC<UploadWidgetProps> = (props) => {
  return (
    <Widget
      body={
        <Button
          component="label"
        >
          <input
            type="file"
            className="inputFileBtnHide"
            onChange={(e) => {
              let image = e.target.files?.item(0)
              if (image) {
                props.onUploadImage({ files: { image: image } })
              }
            }}
          />
        </Button>
      }
    />
  )
}

export default UploadWidget;
