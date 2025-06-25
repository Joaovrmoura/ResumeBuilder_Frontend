function generatePDF() {
    
    const { jsPDF } = window.jspdf;
    const content = document.getElementById('resume');

    const lastChild = content.lastElementChild;
    if (lastChild && lastChild.offsetHeight < 10) {
        lastChild.style.display = 'none';
    }

    // Remover transformações visuais
    // content.style.transform = '';
    // content.style.transformOrigin = '';
    // content.style.width = '';
    content.style.fontFamily = 'Arial'
  
    const pdf = new jsPDF("p", "pt", "a4", true);
    const scale = Math.min(1, pdf.internal.pageSize.getWidth() / content.offsetWidth);
    pdf.html(content, {
        x: 0,
        y: 0,
        html2canvas: {
            scale: scale, 
            scrollY: 0,
            useCORS: true
        },

        autoPaging: true,
        callback: function (_pdf) {
            let totalPages = _pdf.internal.getNumberOfPages();
            for (let i = 2; i <= totalPages; i++) {
                _pdf.setPage(i);
                _pdf.deletePage(i);
                i--;
                totalPages--;
            }
            // window.open(_pdf.output("bloburl"));
            // função para salvar!
             _pdf.save("curriculo.pdf");
        }
    });
}

export default generatePDF
