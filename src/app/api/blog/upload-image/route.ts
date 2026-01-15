import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Upload to ImgBB
    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      }
    )

    if (!imgbbResponse.ok) {
      const errorData = await imgbbResponse.json()
      console.error('ImgBB error:', errorData)
      return NextResponse.json(
        { error: 'Failed to upload image to ImgBB' },
        { status: imgbbResponse.status }
      )
    }

    const imgbbData = await imgbbResponse.json()

    if (!imgbbData.success) {
      return NextResponse.json(
        { error: 'ImgBB upload failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: imgbbData.data.url,
      deleteUrl: imgbbData.data.delete_url,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
