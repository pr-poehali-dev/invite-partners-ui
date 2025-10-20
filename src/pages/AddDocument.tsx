import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Signer {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}

interface UploadedFile extends File {
  preview?: string;
}

const mockSigners: Signer[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    email: "ivanov@alfa.ru",
    company: 'ООО "Альфа"',
    role: "Генеральный директор"
  },
  {
    id: "2",
    name: "Петрова Мария Сергеевна",
    email: "petrova@beta.ru",
    company: 'ООО "Бета Технологии"',
    role: "Главный бухгалтер"
  },
  {
    id: "3",
    name: "Сидоров Петр Александрович",
    email: "sidorov@gamma.ru",
    company: 'АО "Гамма Сервис"',
    role: "Финансовый директор"
  },
  {
    id: "4",
    name: "Иванов Иван Иванович",
    email: "ivanov@ip.ru",
    company: "ИП Иванов И.И.",
    role: "Индивидуальный предприниматель"
  }
];

const AddDocument = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedSigners, setSelectedSigners] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      const newFiles = Array.from(e.dataTransfer.files);
      processFiles(newFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      processFiles(newFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    const filesWithPreview = newFiles.map(file => {
      const fileWithPreview = file as UploadedFile;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      return fileWithPreview;
    });
    setFiles([...files, ...filesWithPreview]);
  };

  const removeFile = (index: number) => {
    const file = files[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ";
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ";
  };

  const toggleSigner = (signerId: string) => {
    if (selectedSigners.includes(signerId)) {
      setSelectedSigners(selectedSigners.filter(id => id !== signerId));
    } else {
      setSelectedSigners([...selectedSigners, signerId]);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'FileText';
      case 'doc':
      case 'docx':
        return 'FileText';
      case 'xls':
      case 'xlsx':
        return 'Sheet';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'Image';
      default:
        return 'File';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
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
                <h1 className="text-2xl font-bold text-gray-900">Создание пакета документов</h1>
                <p className="text-sm text-gray-500">Заполните форму, выберите подписантов и загрузите файлы</p>
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
                disabled={files.length === 0 || selectedSigners.length === 0}
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить пакет ({files.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-[#39587C]" />
                  Информация о пакете
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Название пакета *
                    </label>
                    <Input
                      placeholder="Например: Договор и акты за октябрь"
                      className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                    />
                  </div>

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
                        <SelectItem value="package">Пакет документов</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
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
                      Комментарий
                    </label>
                    <Textarea
                      placeholder="Дополнительная информация о пакете документов"
                      rows={3}
                      className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Icon name="Upload" size={20} className="text-[#39587C]" />
                    Документы пакета
                    {files.length > 0 && (
                      <Badge className="bg-[#39587C] text-white ml-2">
                        {files.length}
                      </Badge>
                    )}
                  </h2>
                  {files.length > 0 && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                      >
                        <Icon name="LayoutGrid" size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-gray-100' : ''}
                      >
                        <Icon name="List" size={18} />
                      </Button>
                    </div>
                  )}
                </div>

                {files.length === 0 ? (
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
                ) : (
                  <>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="relative group bg-gray-50/80 rounded-xl overflow-hidden hover:shadow-lg transition-all border-2 border-gray-200"
                          >
                            <div className="aspect-[3/4] flex items-center justify-center p-4">
                              {file.preview ? (
                                <img
                                  src={file.preview}
                                  alt={file.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg">
                                  <Icon
                                    name={getFileIcon(file.name)}
                                    size={48}
                                    className="text-[#39587C] mb-3"
                                  />
                                  <p className="text-xs text-gray-500 text-center px-2">
                                    {file.name.split('.').pop()?.toUpperCase()}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="p-3 bg-white border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-900 truncate mb-1">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {getFileSize(file.size)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-red-50 text-red-500 hover:text-red-700 shadow-lg"
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        ))}
                        <label
                          htmlFor="file-upload-more"
                          className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#39587C] hover:bg-[#39587C]/5 transition-all"
                        >
                          <Icon name="Plus" size={32} className="text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Добавить еще</p>
                          <input
                            id="file-upload-more"
                            type="file"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors"
                          >
                            {file.preview ? (
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border-2 border-gray-200">
                                <Icon
                                  name={getFileIcon(file.name)}
                                  size={24}
                                  className="text-[#39587C]"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {getFileSize(file.size)} • {file.type || 'Неизвестный тип'}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        ))}
                        <label
                          htmlFor="file-upload-more-list"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#39587C] hover:bg-[#39587C]/5 transition-all"
                        >
                          <Icon name="Plus" size={18} className="text-gray-400" />
                          <p className="text-sm text-gray-500">Добавить еще файлы</p>
                          <input
                            id="file-upload-more-list"
                            type="file"
                            multiple
                            onChange={handleFileInput}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                          />
                        </label>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Icon name="UserCheck" size={20} className="text-[#39587C]" />
                  Подписанты
                  {selectedSigners.length > 0 && (
                    <Badge className="bg-[#39587C] text-white ml-2">
                      {selectedSigners.length}
                    </Badge>
                  )}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Выберите получателей пакета документов
                </p>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {mockSigners.map((signer) => (
                    <div
                      key={signer.id}
                      onClick={() => toggleSigner(signer.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSigners.includes(signer.id)
                          ? 'border-[#39587C] bg-[#39587C]/5 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedSigners.includes(signer.id)
                            ? 'bg-[#39587C] border-[#39587C]'
                            : 'border-gray-300'
                        }`}>
                          {selectedSigners.includes(signer.id) && (
                            <Icon name="Check" size={14} className="text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#39587C] to-[#2d4560] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {signer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {signer.name}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 mb-1 truncate">
                            {signer.company}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {signer.role}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {signer.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSigners.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300 text-[#39587C] focus:ring-[#39587C]"
                          defaultChecked
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Требуется подпись
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Пакет отправится на подписание
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300 text-[#39587C] focus:ring-[#39587C]"
                          defaultChecked
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Уведомить по email
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Отправить письмо получателям
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedSigners.length > 0 && files.length > 0 && (
              <Card className="bg-gradient-to-br from-[#39587C]/10 to-blue-50 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Icon name="Package" size={24} className="text-[#39587C] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Пакет готов к отправке
                      </h3>
                      <p className="text-sm text-gray-600">
                        {files.length} {files.length === 1 ? 'документ' : files.length < 5 ? 'документа' : 'документов'} будет отправлен {selectedSigners.length} {selectedSigners.length === 1 ? 'получателю' : 'получателям'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-green-600" />
                      <span>Документы загружены</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" size={16} className="text-green-600" />
                      <span>Получатели выбраны</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-[#39587C]" />
                      <span>Готово к отправке</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
