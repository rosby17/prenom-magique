// lib/exportPDF.js
import jsPDF from 'jspdf'

export function exportFavoritesToPDF(favorites, userName = '') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()

  // ── Header ────────────────────────────────────────────────
  doc.setFillColor(255, 133, 161)
  doc.rect(0, 0, W, 38, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('✨ Prénom Magique', W / 2, 16, { align: 'center' })

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Mes prénoms favoris' + (userName ? ` — ${userName}` : ''), W / 2, 26, { align: 'center' })

  doc.setFontSize(9)
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, W / 2, 34, { align: 'center' })

  // ── Liste des prénoms ─────────────────────────────────────
  let y = 50
  const pastelColors = [
    [255, 224, 236], [255, 232, 212], [255, 248, 212],
    [212, 248, 228], [212, 238, 255], [237, 212, 255],
  ]

  favorites.forEach((fav, i) => {
    if (y > 265) {
      doc.addPage()
      y = 20
    }

    const color = pastelColors[i % pastelColors.length]
    doc.setFillColor(...color)
    doc.roundedRect(14, y, W - 28, 22, 4, 4, 'F')

    // Prénom
    doc.setTextColor(60, 40, 80)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(fav.prenom, 22, y + 9)

    // Origine
    if (fav.origine) {
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(140, 100, 160)
      doc.text(fav.origine, W - 16, y + 7, { align: 'right' })
    }

    // Signification
    if (fav.signification) {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(100, 80, 120)
      doc.text(`✦ ${fav.signification}`, 22, y + 17)
    }

    y += 28
  })

  // ── Footer ────────────────────────────────────────────────
  const pages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    doc.setFontSize(8)
    doc.setTextColor(200, 160, 200)
    doc.text('prenom-magique.app — Propulsé par Claude AI', W / 2, 292, { align: 'center' })
  }

  doc.save('prénoms-favoris.pdf')
}
