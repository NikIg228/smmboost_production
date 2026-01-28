import React from 'react';
import { RefreshCw } from 'lucide-react';

export const RefundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            ПОЛИТИКА ВОЗВРАТА СРЕДСТВ
          </span>
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 prose prose-invert max-w-none">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <p className="text-white font-semibold mb-2">Исполнитель:</p>
          <p className="mb-1">ТОО «White Trade», БИН 250140025178</p>
          <p className="mb-1">Республика Казахстан, г. Алматы, Бостандыкский район, ул. Тимирязева 69, 050057</p>
          <p className="mt-4">Контакты по возвратам: <a href="mailto:refund@smm-boost.kz" className="text-pink-500 hover:text-pink-400">refund@smm-boost.kz</a></p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">1. Нормативная база и область применения</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>1.1. Настоящая Политика определяет условия, порядок и сроки возврата денежных средств за услуги, приобретаемые через Сервис.</p>
            <p>1.2. Политика разработана с учетом:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Закона РК «О защите прав потребителей» от 04.05.2010 № 274-IV (в части, применимой к потребителю).</li>
              <li>ГК РК (обязательства, договор, расторжение, ответственность).</li>
              <li>Закона РК «О платежах и платежных системах» от 26.07.2016 № 11-VI (платежи и возвраты в платежной инфраструктуре).</li>
              <li>Ст. 57 Закона РК «О платежах и платежных системах» (возврат денег по платежам и (или) переводам).</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">2. Термины</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>2.1. «Возврат» — перечисление Пользователю денежных средств полностью или частично в случаях и порядке, установленных настоящей Политикой и законодательством РК.</p>
            <p>2.2. «Заказ» — оплаченная заявка Пользователя на услугу.</p>
            <p>2.3. «Начало оказания услуги» — момент фактического запуска выполнения Заказа Исполнителем (включая начало технических действий).</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">3. Общие условия возврата</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>3.1. Возврат возможен при наличии оснований, подтвержденных документально/технически, и при условии обращения Пользователя в порядке, установленном разделом 6 настоящей Политики.</p>
            <p>3.2. Возврат осуществляется, как правило, тем же способом, которым была произведена оплата, если технически возможно, с учетом требований платежной инфраструктуры и законодательства.</p>
            <p>3.3. Исполнитель не возвращает комиссию банков/платежных систем, если такая комиссия удержана по правилам соответствующего банка/провайдера и не подлежит возврату по их регламентам.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">4. Случаи, когда возврат возможен</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>4.1. Полный или частичный возврат возможен в следующих случаях:</p>
            <p>4.1.1. Услуга не была оказана: Исполнитель не приступал к исполнению Заказа, либо исполнение невозможно по вине Исполнителя.</p>
            <p>4.1.2. Услуга оказана не в полном объеме по вине Исполнителя (недооказание): фактически выполненный объем меньше оплаченного при отсутствии нарушений со стороны Пользователя.</p>
            <p>4.1.3. Техническая ошибка: двойное списание, ошибочное списание, подтвержденный сбой оплаты/зачисления.</p>
            <p>4.1.4. Отмена Заказа до начала оказания услуги: обращение Пользователя поступило до фактического старта выполнения.</p>
            <p>4.2. По пунктам 4.1.2–4.1.3 возврат производится в размере, соответствующем неоказанной части услуги либо сумме ошибочного списания.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">5. Случаи, когда возврат не производится</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>5.1. Возврат не производится, если:</p>
            <p>5.1.1. Услуга оказана полностью и надлежащим образом в соответствии с параметрами Заказа.</p>
            <p>5.1.2. Услуга начата и частично оказана, и при этом отсутствуют основания считать исполнение ненадлежащим по вине Исполнителя — в таком случае применяется частичный возврат по разделу 7 либо отказ в возврате при полном исполнении.</p>
            <p>5.1.3. Невозможность оказания услуги вызвана действиями/бездействием Пользователя, включая: предоставление неверных данных, изменение параметров/ссылок, отсутствие доступа к публичности страницы при необходимости, иные препятствия со стороны Пользователя.</p>
            <p>5.1.4. Результат изменен/уменьшен по причинам, зависящим от сторонних платформ (алгоритмы, модерация, «чистки», ограничения), при условии, что Исполнитель выполнил предусмотренные Заказом действия/объем и отсутствует вина Исполнителя.</p>
            <p>5.1.5. Пользователь нарушил Пользовательское соглашение (оферту) либо использовал Сервис в противоправных целях.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">6. Порядок подачи заявления на возврат</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>6.1. Для инициирования возврата Пользователь направляет заявление на <a href="mailto:refund@smm-boost.kz" className="text-pink-500 hover:text-pink-400">refund@smm-boost.kz</a> с темой письма «Возврат средств — Заказ №____» и указывает:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>номер Заказа;</li>
              <li>дату и сумму оплаты;</li>
              <li>способ оплаты (карта/кошелек и т.п.);</li>
              <li>e-mail и/или телефон, указанные при заказе;</li>
              <li>описание основания возврата;</li>
              <li>подтверждающие материалы (при наличии): скриншоты, квитанции, идентификатор платежа.</li>
            </ul>
            <p>6.2. Исполнитель вправе запросить подтверждение, что обращение направлено плательщиком (в целях предотвращения мошенничества и защиты персональных данных).</p>
            <p>6.3. Срок рассмотрения заявления: до 10 (десяти) рабочих дней, если иной срок не установлен законом или не требуется дополнительная проверка, о чем Пользователь уведомляется.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">7. Частичный возврат (расчет)</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>7.1. При частичном оказании услуги возврат осуществляется пропорционально неоказанной части объема услуги либо исходя из фактически выполненных этапов, если услуга этапная.</p>
            <p>7.2. Исполнитель вправе удержать стоимость фактически оказанной части услуги и обоснованные затраты, непосредственно связанные с исполнением, при условии подтверждаемости факта частичного исполнения (логами, внутренними актами исполнения, техническими отчетами).</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">8. Сроки возврата и зачисления</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>8.1. Исполнитель инициирует возврат после принятия положительного решения.</p>
            <p>8.2. Фактические сроки зачисления зависят от банка/платежной системы:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>по банковской карте: до 10 рабочих дней;</li>
              <li>по электронным платежам: до 5 рабочих дней, если применимо.</li>
            </ul>
            <p>8.3. Исполнитель не несет ответственности за задержки, вызванные регламентами банков/платежных организаций, но обязуется предоставить подтверждение инициирования возврата по запросу.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">9. Контакты</h2>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>Возвраты: <a href="mailto:refund@smm-boost.kz" className="text-pink-500 hover:text-pink-400">refund@smm-boost.kz</a></p>
            <p>Поддержка: <a href="mailto:support@smm-boost.kz" className="text-pink-500 hover:text-pink-400">support@smm-boost.kz</a>, <a href="tel:+77789836436" className="text-pink-500 hover:text-pink-400">+7 (778) 983 64 36</a></p>
            <p>Юридические вопросы: <a href="mailto:legal@smm-boost.kz" className="text-pink-500 hover:text-pink-400">legal@smm-boost.kz</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};