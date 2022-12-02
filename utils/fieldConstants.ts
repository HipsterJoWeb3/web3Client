import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
// import Table from 'editorjs-table'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'



export const EDITOR_JS_TOOLS: any = {
  paragraph: {
    config: {
      placeholder: 'Enter news text'
    }
  },
  embed: Embed,
  table: {
      class: Table,
      inlineToolbar: true,
      config: {
          rows: 2,
          cols: 3,
      },
  },
  marker: Marker,
  list: List,
  code: Code,
  linkTool: {
    class: LinkTool,
    config: {
        endpoint: `${process.env.BASE_URL}/general/fetchUrl`, // Your backend endpoint for url data fetching
    }
  },
  image: {
    class: Image,
    config: {
        uploader: {
            uploadByFile(file: any) {
                const formData = new FormData()
                formData.append('file', file)
                return fetch(`${process.env.BASE_URL}/posts/uploadImage`, {
                    method: 'POST',
                    body: formData
                })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result)
                    return {
                        success: 1,
                        file: {
                            url: result.file
                        }
                    }
                })
                .catch(() => {
                    return {
                        success: 0
                    }
                })
            }
        }
    }
  },
  header: Header,
  inlineCode: InlineCode,
}

