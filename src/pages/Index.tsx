import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Counterparty {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  address: string;
  status: 'invite' | 'accept' | 'in_list';
}

const mockCounterparties: Counterparty[] = [
  {
    id: '1',
    name: 'ООО "Какая-то длинная рекламная компания"',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'г. Москва, ул. Тверская, д. 15, офис 302',
    status: 'invite'
  },
  {
    id: '2',
    name: 'ООО "Какая-то длинная рекламная компания"',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'г. Москва, ул. Тверская, д. 15, офис 302',
    status: 'invite'
  },
  {
    id: '3',
    name: 'ООО "Какая-то длинная рекламная компания"',
    inn: '1234567890',
    kpp: '0987654321',
    address: 'г. Тульская обл., г. Новомосковск, ул. Березовая, д. 1',
    status: 'accept'
  },
  {
    id: '4',
    name: 'ООО "Какая-то длинная рекламная компания"',
    inn: '1234567890',
    kpp: '0987654321',
    address: 'г. Тульская обл., г. Новомосковск, ул. Березовая, д. 1',
    status: 'in_list'
  }
];

const Index = () => {
  const [activeMenu, setActiveMenu] = useState('counterparties');
  const [activeSubmenu, setActiveSubmenu] = useState('invite');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', hasSubmenu: true },
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'profile', label: 'Профиль компании', icon: 'Building2' },
    { id: 'tariffs', label: 'Тарифы', icon: 'CreditCard' }
  ];

  const submenuItems = [
    { id: 'invite', label: 'Пригласить контрагента' },
    { id: 'your_counterparties', label: 'Ваши контрагенты', count: 9999 },
    { id: 'invitations', label: 'Приглашения вас', count: 9999 },
    { id: 'blocked', label: 'Заблокированные', count: 9999 }
  ];

  const getStatusButton = (status: Counterparty['status']) => {
    switch (status) {
      case 'invite':
        return (
          <Button className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white">
            <Icon name="UserPlus" size={16} className="mr-2" />
            Пригласить
          </Button>
        );
      case 'accept':
        return (
          <Button className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-90 text-white">
            <Icon name="UserCheck" size={16} className="mr-2" />
            Принять приглашение
          </Button>
        );
      case 'in_list':
        return (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Check" size={16} />
            <span className="text-sm">В списке ваших контрагентов</span>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center">
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
            className="w-full mb-6 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white"
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

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Settings" size={20} />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Award" size={20} />
            <span className="text-sm">Тарифы</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-200">
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

        <div className="p-4 border-t border-gray-200">
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

      {/* Secondary Sidebar (Submenu) */}
      {activeMenu === 'counterparties' && (
        <aside className="w-64 bg-white border-r border-gray-200 animate-in slide-in-from-left duration-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-lg">Контрагенты</h2>
          </div>
          <nav className="p-4">
            <Button
              className="w-full mb-4 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Пригласить контрагентов
            </Button>
            <div className="space-y-1">
              {submenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSubmenu(item.id)}
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
        <div className="px-20 py-8">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-8">Пригласить контрагентов</h1>
            <p className="text-muted-foreground mb-6">
              Найдите нужных вам контрагентов любым удобным способом
            </p>

            {/* Search Section */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Введите название организации или ИНН"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white px-6"
              >
                <Icon name="Upload" size={20} className="mr-2" />
                Загрузить файл со списком ИНН
              </Button>
            </div>

            {/* Counterparty Cards */}
            <div className="space-y-4">
              {mockCounterparties.map((counterparty) => (
                <Card key={counterparty.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                          <Icon name="Building2" size={26} className="text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0 grid grid-cols-[2fr_1fr_1fr_2fr] gap-6 items-center">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-base truncate">{counterparty.name}</h3>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">ИНН</p>
                            <p className="text-sm font-medium">{counterparty.inn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">КПП</p>
                            <p className="text-sm font-medium">{counterparty.kpp}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
                            <p className="text-sm font-medium truncate">{counterparty.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">{getStatusButton(counterparty.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;