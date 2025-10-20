import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddDocument = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ";
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-[#39587C]/10"
              >
                <Icon name="ArrowLeft" size={20} className="text-[#39587C]" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Добавить документ</h1>
                <p className="text-sm text-gray-500">Заполните форму и загрузите файлы</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-gray-300"
              >
                Отмена
              </Button>
              <Button
                className="bg-[#39587C] hover:bg-[#2d4560] text-white shadow-lg"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Document Info Card */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icon name="FileText" size={20} className="text-[#39587C]" />
                Информация о документе
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Тип документа *
                  </label>
                  <Select>
                    <SelectTrigger className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Договор</SelectItem>
                      <SelectItem value="act">Акт выполненных работ</SelectItem>
                      <SelectItem value="invoice">Счет на оплату</SelectItem>
                      <SelectItem value="upd">УПД</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Номер документа *
                  </label>
                  <Input
                    placeholder="Введите номер"
                    className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Дата документа *
                  </label>
                  <Input
                    type="date"
                    className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Сумма (₽)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Контрагент *
                  </label>
                  <Select>
                    <SelectTrigger className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]">
                      <SelectValue placeholder="Выберите контрагента" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="org1">ООО "Альфа"</SelectItem>
                      <SelectItem value="org2">ООО "Бета Технологии"</SelectItem>
                      <SelectItem value="org3">АО "Гамма Сервис"</SelectItem>
                      <SelectItem value="org4">ИП Иванов И.И.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Комментарий
                  </label>
                  <Textarea
                    placeholder="Дополнительная информация о документе"
                    rows={3}
                    className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Card */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icon name="Upload" size={20} className="text-[#39587C]" />
                Загрузка файлов
              </h2>

              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? "border-[#39587C] bg-[#39587C]/5"
                    : "border-gray-300 bg-gray-50/50"
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#39587C]/10 flex items-center justify-center">
                    <Icon name="CloudUpload" size={32} className="text-[#39587C]" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      Перетащите файлы сюда
                    </p>
                    <p className="text-sm text-gray-500">
                      или нажмите кнопку ниже для выбора
                    </p>
                  </div>
                  <label htmlFor="file-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#39587C] text-[#39587C] hover:bg-[#39587C]/10"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Icon name="FolderOpen" size={18} className="mr-2" />
                      Выбрать файлы
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Поддерживаются: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (макс. 50 МБ)
                  </p>
                </div>
              </div>

              {/* Files List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    Загруженные файлы ({files.length})
                  </p>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#39587C]/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="File" size={20} className="text-[#39587C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {getFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      >
                        <Icon name="X" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Icon name="Settings" size={20} className="text-[#39587C]" />
                Настройки отправки
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-[#39587C] focus:ring-[#39587C]"
                    defaultChecked
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Требуется подпись контрагента
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Документ будет отправлен на подписание
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-[#39587C] focus:ring-[#39587C]"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Уведомить по email
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Отправить уведомление контрагенту на электронную почту
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-[#39587C] focus:ring-[#39587C]"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Срочный документ
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Пометить документ как требующий срочного рассмотрения
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
