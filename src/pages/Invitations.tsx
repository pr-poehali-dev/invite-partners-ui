import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Invitation {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  address: string;
  invitedAt: string;
}

const mockInvitations: Invitation[] = [
  {
    id: '1',
    name: 'ООО "Строительные технологии"',
    inn: '7701234567',
    kpp: '770101001',
    address: 'г. Москва, ул. Ленина, д. 10',
    invitedAt: '15.10.2025',
  },
  {
    id: '2',
    name: 'ИП Иванов Иван Иванович',
    inn: '772234567890',
    kpp: '-',
    address: 'г. Санкт-Петербург, пр. Невский, д. 45',
    invitedAt: '14.10.2025',
  },
  {
    id: '3',
    name: 'ООО "Торговый дом Восток"',
    inn: '5004567890',
    kpp: '500401001',
    address: 'г. Екатеринбург, ул. Малышева, д. 78',
    invitedAt: '12.10.2025',
  },
];

export default function Invitations() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('counterparties');
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations);

  const handleAccept = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const handleDecline = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const menuItems = [
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', hasSubmenu: true },
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'profile', label: 'Профиль компании', icon: 'Building2' },
    { id: 'tariffs', label: 'Тарифы', icon: 'CreditCard' }
  ];

  const submenuItems = [
    { id: 'invite', label: 'Пригласить контрагента', link: '/' },
    { id: 'your_counterparties', label: 'Ваши контрагенты', count: 9999 },
    { id: 'invitations', label: 'Приглашения вас', count: 9999 },
    { id: 'blocked', label: 'Заблокированные', count: 9999 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
                  onClick={() => {
                    if (item.link) {
                      navigate(item.link);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all text-sm ${
                    item.id === 'invitations'
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

      <main className="flex-1 overflow-auto">
        <div className="px-20 py-8">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Приглашения</h1>
                  <p className="text-muted-foreground">Контрагенты, пригласившие вас к сотрудничеству</p>
                </div>
              </div>

              {invitations.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon name="Inbox" size={40} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Нет приглашений</h3>
                      <p className="text-muted-foreground">У вас пока нет новых приглашений от контрагентов</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <Card key={invitation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-8">
                          <div className="flex items-start gap-5 flex-1 min-w-0">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                              <Icon name="Building2" size={26} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0 grid grid-cols-[2fr_1fr_1fr_2fr_1fr] gap-6">
                              <div className="min-w-0">
                                <h3 className="font-semibold text-base break-words">{invitation.name}</h3>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">ИНН</p>
                                <p className="text-sm font-medium break-words">{invitation.inn}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">КПП</p>
                                <p className="text-sm font-medium break-words">{invitation.kpp}</p>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
                                <p className="text-sm font-medium break-words">{invitation.address}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Дата приглашения</p>
                                <p className="text-sm font-medium break-words">{invitation.invitedAt}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 flex-shrink-0 pt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDecline(invitation.id)}
                              className="gap-2"
                            >
                              <Icon name="X" size={16} />
                              Отклонить
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAccept(invitation.id)}
                              className="gap-2"
                            >
                              <Icon name="Check" size={16} />
                              Принять
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
    </div>
  );
}