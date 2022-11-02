import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export const ImgUploader = (props) => {
  const [state, setState] = useState({
    imgUrl: '',
    isUploading: false
  })

  const uploadImg = async (ev) => {
    setState({ isUploading: true })
    const { secure_url } = await uploadService.uploadImg(ev)
    setState({ isUploading: false, imgUrl: secure_url })
    props.onUploaded && props.onUploaded(secure_url)
  }

  const { imgUrl } = state

  return (
    <div className="upload-preview"  >
      {imgUrl && <img src={imgUrl} />}
      <label htmlFor="imgUpload">Computer</label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}