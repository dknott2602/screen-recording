'use client'
import React, { FormEvent } from "react"
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { ChangeEvent, useState } from "react"
import { useFileInput } from "@/lib/hooks/useFileInput"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants"

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        visibility: 'public',
    });

    const video = useFileInput(MAX_VIDEO_SIZE)
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE)

    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            if(!video.file || !thumbnail.file) {
                setError('Please upload video and thumbnail')
                return
            }
            if(!formDataData.title || !formData.description) {
                setError('Please fill in all details')
                return
            }

            
        } catch(error){
            console.log('Error submitting form: ', error)
        } finally {
            setIsSubmitting(false)
        }

    }

    const UploadPage = ({ error }) => {
        return (
            <div className="wrapper-md upload-page">
                <h1>Upload a video</h1>
                {error && <div className="error-field">{error}</div>}
                <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
                    <FormField 
                        id="title"
                        label="Title"
                        placeholder="Enter a clear and concise video title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <FormField 
                        id="description"
                        label="Description"
                        placeholder="Describe what this video is about"
                        value={formData.description}
                        as="textarea"
                        onChange={handleInputChange}
                    />
                    <FileInput 
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                    />
                    <FileInput 
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                    />


                    <FormField 
                        id="visibility"
                        label="Visibility"
                        value={formData.visibility}
                        as="select"
                        options={[
                            {value: 'public', label: 'Public'},
                            {value: 'private', label: 'Private'}
                        ]}
                        onChange={handleInputChange}
                    />

                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? 'uploading...' : 'Upload video'}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <UploadPage error={error} />
    );
}

export default Page;