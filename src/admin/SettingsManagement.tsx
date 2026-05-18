import { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Database,
} from 'lucide-react';
import { GlassCard } from './components/SharedComponents';

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lowStockAlert: true,
    newOrderAlert: true,
    customerFeedback: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordComplexity: true,
    loginAlerts: true,
  });

  const [system, setSystem] = useState({
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    currency: 'VND',
    dateFormat: 'DD/MM/YYYY',
    autoBackup: true,
    maintenanceMode: false,
  });

  const settingsTabs = [
    { id: 'general', label: 'Cài Đặt Chung', icon: Settings },
    { id: 'notifications', label: 'Thông Báo', icon: Bell },
    { id: 'security', label: 'Bảo Mật', icon: Shield },
    { id: 'system', label: 'Hệ Thống', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Cài Đặt Hệ Thống</h2>
        <p className="text-sm text-slate-500 mt-1">Quản lý cấu hình và tùy chọn hệ thống</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <GlassCard className="p-4">
          <div className="space-y-2">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full h-11 rounded-xl px-3 flex items-center gap-2.5 text-sm font-medium transition-all duration-200 ease-out ${
                    activeTab === tab.id
                      ? 'bg-[#D56844] text-white shadow-lg'
                      : 'text-[#555555] hover:bg-[rgba(213,104,68,0.08)] hover:text-[#D56844]'
                  }`}
                >
                  <Icon className={['h-5 w-5', activeTab === tab.id ? 'text-white' : 'text-[#888888]'].join(' ')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Chung</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tên Cửa Hàng</label>
                    <input
                      type="text"
                      defaultValue="Aventis Perfume"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="contact@aventis.com"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số Điện Thoại</label>
                    <input
                      type="tel"
                      defaultValue="0123456789"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Địa Chỉ</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Nguyễn Trãi, Q.1, TP.HCM"
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Thông Báo</h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">
                          {key === 'emailNotifications' && 'Thông báo email'}
                          {key === 'smsNotifications' && 'Thông báo SMS'}
                          {key === 'pushNotifications' && 'Thông báo đẩy'}
                          {key === 'lowStockAlert' && 'Cảnh báo tồn kho thấp'}
                          {key === 'newOrderAlert' && 'Thông báo đơn hàng mới'}
                          {key === 'customerFeedback' && 'Phản hồi khách hàng'}
                        </div>
                        <div className="text-sm text-slate-500">
                          {key === 'emailNotifications' && 'Nhận thông báo qua email'}
                          {key === 'smsNotifications' && 'Nhận thông báo qua tin nhắn SMS'}
                          {key === 'pushNotifications' && 'Nhận thông báo đẩy trên trình duyệt'}
                          {key === 'lowStockAlert' && 'Cảnh báo khi sản phẩm sắp hết hàng'}
                          {key === 'newOrderAlert' && 'Thông báo khi có đơn hàng mới'}
                          {key === 'customerFeedback' && 'Thông báo khi khách hàng gửi phản hồi'}
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key as keyof typeof notifications]: !prev[key as keyof typeof notifications] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-[#D56844]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Bảo Mật</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Xác thực hai yếu tố</div>
                      <div className="text-sm text-slate-500">Yêu cầu mã xác thực khi đăng nhập</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.twoFactorAuth ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Thời gian hết phiên (phút)</label>
                    <input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Độ phức tạp mật khẩu</div>
                      <div className="text-sm text-slate-500">Yêu cầu mật khẩu mạnh</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, passwordComplexity: !prev.passwordComplexity }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.passwordComplexity ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.passwordComplexity ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Cảnh báo đăng nhập</div>
                      <div className="text-sm text-slate-500">Thông báo khi có đăng nhập mới</div>
                    </div>
                    <button
                      onClick={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        security.loginAlerts ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cài Đặt Hệ Thống</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ngôn ngữ</label>
                    <select
                      value={system.language}
                      onChange={(e) => setSystem(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Múi giờ</label>
                    <select
                      value={system.timezone}
                      onChange={(e) => setSystem(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                      <option value="Asia/Bangkok">Asia/Bangkok</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tiền tệ</label>
                    <select
                      value={system.currency}
                      onChange={(e) => setSystem(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="VND">VND (₫)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Định dạng ngày</label>
                    <select
                      value={system.dateFormat}
                      onChange={(e) => setSystem(prev => ({ ...prev, dateFormat: e.target.value }))}
                      className="w-full px-4 py-2 bg-white/45 border border-white/60 rounded-xl outline-none focus:bg-white/60 transition-colors"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Sao lưu tự động</div>
                      <div className="text-sm text-slate-500">Tự động sao lưu dữ liệu hàng ngày</div>
                    </div>
                    <button
                      onClick={() => setSystem(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        system.autoBackup ? 'bg-[#D56844]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          system.autoBackup ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-900">Chế độ bảo trì</div>
                      <div className="text-sm text-slate-500">Tạm thời vô hiệu hóa cửa hàng</div>
                    </div>
                    <button
                      onClick={() => setSystem(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        system.maintenanceMode ? 'bg-red-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          system.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/60">
            <button className="px-6 py-2 bg-white/45 border border-white/60 rounded-xl hover:bg-white/60 transition-colors font-medium text-slate-700">
              Hủy
            </button>
            <button className="px-6 py-2 bg-[#D56844] text-white rounded-xl hover:bg-[#B85A3A] transition-colors font-medium">
              Lưu Thay Đổi
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SettingsManagement;
