const db = require('../services/db');

const getExtension = (mimeType) => {
  const mapping = {
    'application/pdf': '.pdf',
    'image/png': '.png',
    'image/jpeg': '.jpeg',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  };

  return mapping[mimeType] || '';
};

class FormController {
    async uploadForm(req, res) {
        const { date, userId, partnerId, tenantId } = req.body;
        const files = req.files;
        let now = new Date();
    
        if (!files || files.length === 0) {
          return res.status(400).json({ message: "Файлы не загружены" });
        }
    
        try {
          const uploadedFiles = [];
          const [year, month] = date.split("-");
    
          for (const file of files) {
            const originalName = file.originalname;
            const fileType = file.mimetype;
            const extension = getExtension(fileType);
    
            const fileId = await db.insertFileData(originalName, extension, now); // Используем функцию для вставки файла
    
            const newFileName = `${fileId}${extension}`;
            const newFilePath = `uploads/${newFileName}`;
    
            const fs = require('fs');
            fs.renameSync(file.path, newFilePath);
    
            await db.updateFilePath(fileId, newFilePath); // Обновляем путь к файлу в базе
    
            await db.insertMarketingReport(month, year, fileId, userId, tenantId, partnerId, now); // Вставляем отчет
    
            uploadedFiles.push({ id: fileId, name: originalName, path: newFilePath });
          }
    
          res.status(200).json({
            message: "Файлы успешно загружены",
            files: uploadedFiles
          });
        } catch (error) {
          console.error("Ошибка при загрузке файлов:", error);
          res.status(500).json({ message: "Ошибка при загрузке файлов" });
        }
      }
}
module.exports = new FormController();
