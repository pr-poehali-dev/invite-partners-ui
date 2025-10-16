import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Counterparty {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  address: string;
  status: 'invite' | 'accept' | 'in_list';
  type: 'company' | 'person';
  city: string;
}

const mockCounterparties: Counterparty[] = [
  {
    id: '1',
    name: 'ООО "Рога и копыта"',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'ул. Тверская, д. 15, офис 302',
    city: 'Москва',
    status: 'invite',
    type: 'company'
  },
  {
    id: '2',
    name: 'Дмитриев Дмитрий Дмитриевич',
    inn: '469380163155',
    kpp: '—',
    address: 'ул. Ленина, д. 42',
    city: 'Санкт-Петербург',
    status: 'accept',
    type: 'person'
  },
  {
    id: '3',
    name: 'ООО "Производственная компания Альфа"',
    inn: '1234567890',
    kpp: '0987654321',
    address: 'ул. Березовая, д. 1',
    city: 'Новомосковск',
    status: 'in_list',
    type: 'company'
  },
  {
    id: '4',
    name: 'ИП Петров Петр Петрович',
    inn: '123456789012',
    kpp: '—',
    address: 'пр. Мира, д. 88',
    city: 'Екатеринбург',
    status: 'invite',
    type: 'person'
  },
  {
    id: '5',
    name: 'ООО "ТехноЛогистика"',
    inn: '9876543210',
    kpp: '1234567890',
    address: 'ул. Промышленная, д. 5',
    city: 'Казань',
    status: 'invite',
    type: 'company'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('counterparties');
  const [activeSubmenu, setActiveSubmenu] = useState('invite');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'invite' | 'accept' | 'in_list'>('all');

  const menuItems = [
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', hasSubmenu: true },
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'profile', label: 'Профиль компании', icon: 'Building2' },
    { id: 'tariffs', label: 'Тарифы', icon: 'CreditCard' }
  ];

  const submenuItems = [
    { id: 'invite', label: 'Пригласить контрагента' },
    { id: 'your_counterparties', label: 'Ваши контрагенты', count: 9999 },
    { id: 'invitations', label: 'Приглашения вас', count: 9999, link: '/invitations' },
    { id: 'blocked', label: 'Заблокированные', count: 9999 }
  ];

  const filteredCounterparties = mockCounterparties.filter(c => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.inn.includes(searchQuery)) return false;
    return true;
  });

  const stats = {
    total: mockCounterparties.length,
    invite: mockCounterparties.filter(c => c.status === 'invite').length,
    accept: mockCounterparties.filter(c => c.status === 'accept').length,
    in_list: mockCounterparties.filter(c => c.status === 'in_list').length
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-200/50">
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
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeMenu === item.id
                    ? 'bg-blue-50 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
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

        <div className="p-4 border-t border-gray-200/50 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Settings" size={20} />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Award" size={20} />
            <span className="text-sm">Тарифы</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-200/50">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3">
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

        <div className="p-4 border-t border-gray-200/50">
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

      {/* Secondary Sidebar */}
      {activeMenu === 'counterparties' && (
        <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 animate-in slide-in-from-left duration-300 shadow-xl">
          <div className="p-6 border-b border-gray-200/50">
            <h2 className="font-semibold text-lg">Контрагенты</h2>
            <p className="text-xs text-muted-foreground mt-1">Управление контрагентами</p>
          </div>
          <nav className="p-4">
            <Button
              className="w-full mb-4 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white shadow-lg"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Пригласить контрагентов
            </Button>
            <div className="space-y-1">
              {submenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.link) {
                      navigate(item.link);
                    } else {
                      setActiveSubmenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all text-sm ${
                    activeSubmenu === item.id
                      ? 'bg-blue-50 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2563EB] to-[#7c3aed] bg-clip-text text-transparent mb-2">
                  Найдите контрагентов
                </h1>
                <p className="text-muted-foreground text-lg">
                  Простой поиск по ИНН или названию компании
                </p>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white shadow-lg">
                <Icon name="Upload" size={20} className="mr-2" />
                Импорт из файла
              </Button>
            </div>

            {/* Search Bar */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="relative">
                  <Icon
                    name="Search"
                    size={24}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    type="text"
                    placeholder="Введите ИНН или название организации..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 h-14 text-lg border-0 bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredCounterparties.map((counterparty) => (
              <Card 
                key={counterparty.id} 
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group border-0 bg-white/80 backdrop-blur-xl"
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-6 p-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      counterparty.type === 'company' 
                        ? 'bg-gradient-to-br from-blue-100 to-blue-200' 
                        : 'bg-gradient-to-br from-purple-100 to-purple-200'
                    }`}>
                      <Icon 
                        name={counterparty.type === 'company' ? 'Building2' : 'User'} 
                        size={28} 
                        className={counterparty.type === 'company' ? 'text-blue-600' : 'text-purple-600'}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {counterparty.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">ИНН:</span>
                          <span className="ml-2 font-medium">{counterparty.inn}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">КПП:</span>
                          <span className="ml-2 font-medium">{counterparty.kpp}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Город:</span>
                          <span className="ml-2 font-medium">{counterparty.city}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={14} />
                        <span>{counterparty.address}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0">
                      {counterparty.status === 'invite' && (
                        <Button className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white shadow-lg">
                          <Icon name="UserPlus" size={18} className="mr-2" />
                          Пригласить
                        </Button>
                      )}
                      {counterparty.status === 'accept' && (
                        <div className="flex gap-3">
                          <Button variant="outline" className="shadow-md">
                            <Icon name="X" size={18} className="mr-2" />
                            Отклонить
                          </Button>
                          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white shadow-lg">
                            <Icon name="Check" size={18} className="mr-2" />
                            Принять
                          </Button>
                        </div>
                      )}
                      {counterparty.status === 'in_list' && (
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                          <Icon name="CheckCircle" size={20} />
                          <span>В вашем списке</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;