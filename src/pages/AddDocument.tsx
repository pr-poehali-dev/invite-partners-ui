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

interface ElectronicSignature {
  id: string;
  name: string;
  organization: string;
  inn: string;
  validUntil: string;
  issuer: string;
}

interface UploadedFile extends File {
  preview?: string;
}

interface Counterparty {
  id: string;
  name: string;
  inn: string;
}

const mockCounterparties: Counterparty[] = [
  { id: "1", name: 'ООО "Альфа"', inn: "7701234567" },
  { id: "2", name: 'ООО "Бета Технологии"', inn: "7702345678" },
  { id: "3", name: 'АО "Гамма Сервис"', inn: "7703456789" },
  { id: "4", name: "ИП Иванов И.И.", inn: "770456789012" },
  { id: "5", name: 'ООО "Дельта"', inn: "7705567890" },
  { id: "6", name: 'ООО "Эпсилон Плюс"', inn: "7706678901" },
];

const mockSignatures: ElectronicSignature[] = [
  {
    id: "1",
    name: "Иванов Иван Иванович",
    organization: 'ООО "Альфа"',
    inn: "7701234567",
    validUntil: "15.12.2025",
    issuer: "УЦ Контур"
  },
  {
    id: "2",
    name: "Петрова Мария Сергеевна",
    organization: 'ООО "Альфа"',
    inn: "7701234567",
    validUntil: "22.03.2026",
    issuer: "УЦ СберБизнес"
  },
  {
    id: "3",
    name: "Сидоров Петр Александрович",
    organization: 'ООО "Альфа"',
    inn: "7701234567",
    validUntil: "10.08.2025",
    issuer: "УЦ Калуга Астрал"
  }
];

const AddDocument = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<string>("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeMenu, setActiveMenu] = useState('documents');
  const [counterpartySearch, setCounterpartySearch] = useState("");
  const [showCounterpartyDropdown, setShowCounterpartyDropdown] = useState(false);
  const [selectedCounterparty, setSelectedCounterparty] = useState<Counterparty | null>(null);
  const [documentType, setDocumentType] = useState<string>("");

  const menuItems = [
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', count: 9999 }
  ];

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

  const filteredCounterparties = mockCounterparties.filter(cp => 
    cp.name.toLowerCase().includes(counterpartySearch.toLowerCase()) ||
    cp.inn.includes(counterpartySearch)
  );

  const handleCounterpartySelect = (counterparty: Counterparty) => {
    setSelectedCounterparty(counterparty);
    setCounterpartySearch(counterparty.name);
    setShowCounterpartyDropdown(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <aside className="w-72 bg-white/70 backdrop-blur-xl shadow-xl flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <Icon name="FileSignature" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">ЭДО Система</h1>
              <p className="text-xs text-muted-foreground">Электронный документооборот</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <Button
            onClick={() => navigate('/add-document')}
            className="w-full mb-6 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white shadow-lg"
            size="lg"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Новый документ
          </Button>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  if (item.id === 'documents') {
                    navigate('/');
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeMenu === item.id
                    ? 'bg-blue-50 text-primary font-medium shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.count && (
                  <Badge variant="secondary" className="text-xs">
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 mt-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:shadow-md rounded-xl text-left transition-all">
            <Icon name="Settings" size={20} />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:shadow-md rounded-xl text-left transition-all">
            <Icon name="Award" size={20} />
            <span className="text-sm">Тарифы</span>
          </button>
        </div>

        <div className="p-4 mt-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium">Хранение</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] h-1.5 rounded-full" style={{ width: '54%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">8.2 / 15 ГБ</p>
          </div>
        </div>

        <div className="p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center text-white text-sm font-semibold">
              ДД
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Дмитриев Дмитрий</p>
              <p className="text-xs text-muted-foreground">user@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md shadow-sm">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Создание пакета документов</h1>
                <p className="text-sm text-gray-500">Заполните форму, выберите подписанта и загрузите файлы</p>
              </div>
              <Button
                className="bg-[#39587C] hover:bg-[#2d4560] text-white shadow-lg"
                disabled={files.length === 0 || !selectedSignature}
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить пакет ({files.length})
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                  <CardContent className="p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Icon name="FileText" size={20} className="text-[#39587C]" />
                      Информация о пакете
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-2 relative">
                        <label className="text-sm font-medium text-gray-700">
                          Контрагент *
                        </label>
                        <div className="relative">
                          <Input
                            placeholder="Начните вводить название или ИНН"
                            value={counterpartySearch}
                            onChange={(e) => {
                              setCounterpartySearch(e.target.value);
                              setShowCounterpartyDropdown(true);
                              if (!e.target.value) {
                                setSelectedCounterparty(null);
                              }
                            }}
                            onFocus={() => setShowCounterpartyDropdown(true)}
                            className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                          />
                          <Icon 
                            name="Search" 
                            size={18} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>
                        {showCounterpartyDropdown && counterpartySearch && filteredCounterparties.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {filteredCounterparties.map((cp) => (
                              <button
                                key={cp.id}
                                type="button"
                                onClick={() => handleCounterpartySelect(cp)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                <div className="font-medium text-sm text-gray-900">{cp.name}</div>
                                <div className="text-xs text-gray-500 mt-1">ИНН: {cp.inn}</div>
                              </button>
                            ))}
                          </div>
                        )}
                        {selectedCounterparty && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                            <Icon name="CheckCircle2" size={14} className="text-green-600" />
                            <span>ИНН: {selectedCounterparty.inn}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Тип документа *
                        </label>
                        <Select onValueChange={setDocumentType} value={documentType}>
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
                          Номер документа
                        </label>
                        <Input
                          placeholder="Необязательно"
                          className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Дата документа
                        </label>
                        <Input
                          type="date"
                          className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                        />
                      </div>

                      {documentType === 'act' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Период выполнения работ *
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                type="date"
                                placeholder="с"
                                className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                              />
                              <Input
                                type="date"
                                placeholder="по"
                                className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Стоимость работ *
                            </label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                            />
                          </div>
                        </>
                      )}

                      {documentType === 'invoice' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Сумма к оплате *
                            </label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Срок оплаты
                            </label>
                            <Input
                              type="date"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                            />
                          </div>
                        </>
                      )}

                      {documentType === 'upd' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Сумма без НДС *
                            </label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              НДС (20%)
                            </label>
                            <Input
                              type="number"
                              placeholder="Рассчитается автоматически"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C] bg-gray-50"
                              disabled
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Общая сумма с НДС
                            </label>
                            <Input
                              type="number"
                              placeholder="Рассчитается автоматически"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C] bg-gray-50"
                              disabled
                            />
                          </div>
                        </>
                      )}

                      {documentType === 'contract' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Предмет договора *
                            </label>
                            <Input
                              placeholder="Например: Оказание услуг"
                              className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Срок действия
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                type="date"
                                placeholder="с"
                                className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                              />
                              <Input
                                type="date"
                                placeholder="по"
                                className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Электронная подпись *
                        </label>
                        <Select onValueChange={setSelectedSignature} value={selectedSignature}>
                          <SelectTrigger className="border-gray-300 focus:border-[#39587C] focus:ring-[#39587C]">
                            <SelectValue placeholder="Выберите подпись для отправки" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockSignatures.map((signature) => (
                              <SelectItem key={signature.id} value={signature.id}>
                                {signature.name} ({signature.organization}, {signature.issuer}, до {signature.validUntil})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
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

                {selectedSignature && files.length > 0 && (
                  <Card className="bg-gradient-to-br from-[#39587C]/10 to-blue-50 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Icon name="Package" size={24} className="text-[#39587C] mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Пакет готов к отправке
                          </h3>
                          <p className="text-sm text-gray-600">
                            {files.length} {files.length === 1 ? 'документ' : files.length < 5 ? 'документа' : 'документов'} будет подписан и отправлен
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
                          <span>ЭП выбрана</span>
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
    </div>
  );
};

export default AddDocument;