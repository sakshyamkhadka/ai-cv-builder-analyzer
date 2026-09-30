import html2pdf from 'html2pdf.js'

export const downloadElementAsPdf = (
  element: HTMLElement,
  fileName: string
) => {
  const options = {
    margin: 0,
    filename: fileName,
    image: {
      type: 'jpeg' as const,
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const
    },
    pagebreak: {
      mode: ['css', 'legacy'] as const
    }
  }

  return html2pdf()
    .set(options)
    .from(element)
    .save()
}