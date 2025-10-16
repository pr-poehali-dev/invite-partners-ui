import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HistoryItem {
  id: string;
  type: 'signed' | 'sent' | 'agreed' | 'approved';
  company: string;
  person: string;
  action: string;
  date: string;
  role?: string;
}

const historyItems: HistoryItem[] = [
  {
    id: '1',
    type: 'signed',
    company: 'ООО "Рога и копыта"',
    person: 'Иванов И.И.',
    action: 'подписал и отправил документ',
    date: '02.01.2025 12:00',
    role: 'Компания'
  },
  {
    id: '2',
    type: 'approved',
    company: 'ООО "Какое-то очень длинное название компании"',
    person: 'Петров П.П.',
    action: 'получил документ',
    date: '02.01.2025 12:00',
    role: 'Головное подразделение'
  },
  {
    id: '3',
    type: 'sent',
    company: '',
    person: 'Петров П. П.',
    action: 'передал документ на согласование сотруднику: Дмитриев Д. Д.',
    date: '02.01.2025 12:00',
    role: 'Менеджер'
  },
  {
    id: '4',
    type: 'agreed',
    company: '',
    person: 'Дмитриев Д. Д.',
    action: 'согласовал и передал документ на согласование сотруднику: Краснова И.И.',
    date: '02.01.2025 12:00',
    role: 'Директор'
  },
  {
    id: '5',
    type: 'approved',
    company: '',
    person: 'Краснова И.И.',
    action: 'согласовала документ и передавала на подписание сотруднику: Дмитриев Д.Д.',
    date: '02.01.2025 12:00',
    role: 'Бухгалтер'
  },
  {
    id: '6',
    type: 'signed',
    company: '',
    person: 'Дмитриев Д. Д.',
    action: 'подписал и завершил документооборот',
    date: '02.01.2025 12:00',
    role: 'Директор'
  }
];

const Document = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('documents');

  const menuItems = [
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', count: 9999 }
  ];

  const getHistoryIcon = (type: HistoryItem['type']) => {
    switch (type) {
      case 'signed':
        return 'CheckCircle';
      case 'sent':
        return 'Send';
      case 'agreed':
        return 'CheckSquare';
      case 'approved':
        return 'ThumbsUp';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl flex flex-col shadow-xl mr-4">
        <div className="p-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <Icon name="Building2" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">ИП Дмитриев</h1>
              <p className="text-xs text-muted-foreground">Дмитрий Дмитриев</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <Button
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

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Document View */}
        <div className="flex-1 overflow-auto">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white/70 backdrop-blur-xl px-8 py-6 shadow-md mb-4">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="gap-2"
                >
                  <Icon name="ArrowLeft" size={18} />
                  Назад
                </Button>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">Входящий акт №9999 от 01.01.2025</h1>
                  <p className="text-sm text-muted-foreground">99999,00 ₽ НДС: 9999,00 ₽ со счётом-фактурой</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Подразделение: Головное подразделение
                </div>
                <Badge className="text-xs">Документов в пакете: 1</Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" className="gap-2 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] text-white shadow-md">
                  <Icon name="FilePlus" size={16} />
                  Подписать
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="FileX" size={16} />
                  Отказать
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Send" size={16} />
                  Согласование
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Download" size={16} />
                  Скачать
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Printer" size={16} />
                  Печать
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Trash2" size={16} />
                  Удалить
                </Button>
              </div>

              <div className="mt-4 inline-block">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Требует подписания</Badge>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto px-8 pb-8">
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-bold mb-4">Акт такой-то такой-то №9999 от 01.01.2025</h2>
                      <div className="flex justify-between text-sm">
                        <span>г. Москва</span>
                        <span>"01" апреля 2025</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-justify">
                      <p>
                        Общество с ограниченной ответственностью «Рога и Копыта», зарегистрированное в Едином государственном реестре юридических лиц за № 7701234567, ИНН 7701000001, ОГРН 1027700000001, именуемое в дальнейшем «Сторона А», в лице Генерального директора Иванова Ивана Ивановича, действующего на основании Устава с одной стороны, и Общество с дополнительной ответственностью «Какое-то очень длинное название компании, зарегистрированное в соответствии с действующим законодательством Российской Федерации и осуществляющее деятельность в рамках обеспечиваемых норм делового оборота.
                      </p>

                      <div className="my-6">
                        <h3 className="font-semibold mb-3">1. Предмет Акта</h3>
                        <p className="mb-2">
                          1.1. Настоящий Акт подтверждает, что в период с «00» месяца 2024 года по «неопределённую дату» 2025 года (включительно) между Сторонами не имело места:
                        </p>
                        <ul className="list-disc pl-8 space-y-1">
                          <li>ни одного телефонного звонка;</li>
                          <li>ни одного электронного письма;</li>
                          <li>ни одного мессенджера, отправленного по ошибке;</li>
                          <li>ни одной встречи в коридоре (в том числе виртуальной);</li>
                          <li>ни одной мысли о сотрудничестве;</li>
                        </ul>
                      </div>

                      <p>
                        Стороны подтверждают, что все вышеуказанные пункты являются абсолютно верными и не подлежат оспариванию в любых инстанциях, включая судебные органы всех уровней.
                      </p>

                      <div className="mt-12 grid grid-cols-2 gap-8">
                        <div>
                          <p className="font-semibold mb-4">Сторона А:</p>
                          <div className="space-y-2">
                            <p>Генеральный директор</p>
                            <div className="flex items-center gap-4">
                              <div className="border-b border-gray-400 flex-1"></div>
                              <span>И.И. Иванов</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold mb-4">Сторона Б:</p>
                          <div className="space-y-2">
                            <p>Генеральный директор</p>
                            <div className="flex items-center gap-4">
                              <div className="border-b border-gray-400 flex-1"></div>
                              <span>П.П. Петров</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* History Sidebar */}
        <aside className="w-96 bg-white/70 backdrop-blur-xl shadow-xl ml-4 overflow-hidden flex flex-col">
          <div className="p-6 mb-2">
            <h2 className="font-semibold text-lg">История документа</h2>
          </div>

          <div className="flex-1 overflow-auto px-6 pb-6">
            <div className="space-y-4">
              {historyItems.map((item, index) => (
                <div key={item.id} className="relative">
                  {index !== historyItems.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent"></div>
                  )}
                  
                  <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border-0 rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                          item.type === 'signed' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                          item.type === 'sent' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                          item.type === 'agreed' ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                          'bg-gradient-to-br from-orange-100 to-orange-200'
                        }`}>
                          <Icon 
                            name={getHistoryIcon(item.type)} 
                            size={20} 
                            className={
                              item.type === 'signed' ? 'text-green-600' :
                              item.type === 'sent' ? 'text-blue-600' :
                              item.type === 'agreed' ? 'text-purple-600' :
                              'text-orange-600'
                            }
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          {item.company && (
                            <div className="flex items-center gap-2 mb-1">
                              <Icon name="Building2" size={14} className="text-muted-foreground flex-shrink-0" />
                              <p className="font-semibold text-sm truncate">{item.company}</p>
                            </div>
                          )}
                          
                          <p className="text-sm mb-1">
                            <span className="font-medium">{item.person}</span> {item.action}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            {item.role && (
                              <>
                                <Badge variant="secondary" className="text-xs">{item.role}</Badge>
                                <span>•</span>
                              </>
                            )}
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Document;
