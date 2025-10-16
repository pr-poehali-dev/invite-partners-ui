import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations);

  const handleAccept = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const handleDecline = (id: string) => {
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

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
                        <div className="flex items-center justify-between gap-8">
                          <div className="flex items-center gap-5 flex-1 min-w-0">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                              <Icon name="Building2" size={26} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0 grid grid-cols-[2fr_1fr_1fr_2fr_1fr] gap-6 items-center">
                              <div className="min-w-0">
                                <h3 className="font-semibold text-base truncate">{invitation.name}</h3>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">ИНН</p>
                                <p className="text-sm font-medium">{invitation.inn}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">КПП</p>
                                <p className="text-sm font-medium">{invitation.kpp}</p>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
                                <p className="text-sm font-medium truncate">{invitation.address}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Дата приглашения</p>
                                <p className="text-sm font-medium">{invitation.invitedAt}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
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
    </div>
  );
}
