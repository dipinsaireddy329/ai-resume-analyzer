import PDFDocument from 'pdfkit';

export function buildAnalysisPdf({ resume, analysis }) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 48 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(22).text('AI Resume Analysis Report');
    doc.moveDown().fontSize(12).text(`Resume: ${resume.originalName}`);
    doc.text(`Target Role: ${analysis.targetRole || resume.targetRole || 'Not specified'}`);
    doc.text(`ATS Score: ${analysis.atsScore}/100`);

    const section = (title, items) => {
      doc.moveDown().fontSize(16).text(title);
      doc.fontSize(11);
      (items?.length ? items : ['No data available']).forEach((item) => doc.text(`- ${item}`));
    };

    section('Skills', analysis.skills);
    section('Missing Skills', analysis.missingSkills);
    section('Strengths', analysis.strengths);
    section('Weaknesses', analysis.weaknesses);
    section('Recommendations', analysis.recommendations);
    doc.moveDown().fontSize(16).text('Role Predictions');
    analysis.rolePredictions.forEach((prediction) => {
      doc.fontSize(11).text(`- ${prediction.role}: ${prediction.matchPercentage}% - ${prediction.explanation}`);
    });
    doc.end();
  });
}
