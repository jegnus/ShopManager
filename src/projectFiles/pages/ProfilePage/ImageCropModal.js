import React, { useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import { useDebounceEffect } from './useDebounceEffects';
import { base64StringtoFile, image64toCanvasRef, canvasPreview, extractImageFileExtensionFromBase64, downloadBase64File } from './imageHandlingMethods';


const centerAspectCrop = (mediaWidth, mediaHeight, aspect,) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

function ImageCropModal(props) {
    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [aspect, setAspect] = useState(1 / 1)
    const [rotate, setRotate] = useState(0)
    const [scale, setScale] = useState(1)
    const [completedCrop, setCompletedCrop] = useState()
    const [categoryName, setcategoryName] = useState("")
    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })
    const [imgSrc, setImgSrc] = useState('')

    useEffect(() => {
        setImgSrc(props.imgSource)
        console.log(props.imageAspect)
        if (props.imageAspect == 16 / 9) {
            setAspect(16 / 9)
        }
    }, [])

    const onSelectFile = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            console.log("image file", reader)


        }
    }

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    const handleImageCropComplete = (pixelCrop) => {
        const canvasRef = previewCanvasRef.current
        const orignalImg = imgSrc
        // image64toCanvasRef(canvasRef, orignalImg, pixelCrop)
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    const handleCroppedImage = (event) => {
        event.preventDefault()
        const canvasRef = previewCanvasRef.current
        const srcImg = imgSrc
        const fileExtension = extractImageFileExtensionFromBase64(srcImg)
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension)


        const myFilename = "previewFile." + fileExtension

        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
        console.log('cropped file')
        props.sub(imageData64, myNewCroppedFile)
        // downloadBase64File(imageData64, myFilename)
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <form action="" > */}
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{ color: '#fb6e3c', fontWeight: 'light' }}>Crop Food Item Image</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div style={{}}>

                    <div className='row' style={{}}>
                        <div className='col-lg-6'>

                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c, b) => {
                                    setCompletedCrop(c)
                                    console.log("on complete", c)
                                    console.log("image ref", imgRef)
                                    console.log("b", b)
                                    handleImageCropComplete(c)
                                }}
                                aspect={aspect}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={props.imgSource}
                                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, }} onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        </div>
                        <div className='col-lg-6'>
                            <p>Preview:</p>
                            {
                                completedCrop &&
                                <>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            border: '1px solid black',
                                            objectFit: 'contain',
                                            // width: completedCrop.width,
                                            // height: completedCrop.height,
                                            width: '100%',

                                        }}
                                    />
                                    {/* <button onClick={handleCroppedImage}>Download</button> */}
                                </>
                            }




                        </div>
                    </div>

                </div>
            </Modal.Body>


            <Modal.Footer>
                <button onClick={(e) => {
                    // console.log("clicked")
                    handleCroppedImage(e)
                }} className='justify-end addCategory'>Crop</button>
            </Modal.Footer>
            {/* </form> */}
        </Modal>
    )
}

export default ImageCropModal