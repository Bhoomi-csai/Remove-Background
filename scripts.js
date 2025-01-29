document.getElementById( 'removeBgBtn').addEventListener('click', async() => {
    const fileInput = document.getElementById('imageUpload')
    const originalImage = document.getElementById('originalImage');
    const outputImage = document.getElementById('outputImage')
    const downloadBtn = document.getElementById('downloadBtn')

    if(!fileInput.files[0]){
        alert("Please upload an image");
        return;
    }

    const formData = new FormData();
    formData.append('image_file', fileInput.files[0]);

    try{
        const reader = new FileReader();
        reader.onload = () => {
            originalImage.src = reade.result;
        };
        reader.readAsDataURL(fileInput.fileInput[0]);

        //API
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: "POST",
            headers: {
                'X-Api-Key' : 'YKGwZS4yA26JnTpWXqX7FLkh',
            },
            body: formData, 
        });

        if(!response.ok){
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob);

        outputImage.src = url;

        downloadBtnBtn.classList.remove('hidden');
        downloadBtn.onclick = () => {
            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.download = 'background-removed.png';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(url);
        };
    }catch{
        console.error('Error', error);
        alert('Failed to remove background. Please try again.')
    }
})