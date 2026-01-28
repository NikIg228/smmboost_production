import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ (ПУБЛИЧНАЯ ОФЕРТА)
          </span>
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-300 prose prose-invert max-w-none">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <p className="text-white font-semibold mb-2">Исполнитель:</p>
          <p className="mb-1">ТОО «White Trade», БИН 250140025178</p>
          <p className="mb-1">Республика Казахстан, г. Алматы, Бостандыкский район, ул. Тимирязева 69, 050057</p>
          <p className="mt-4 mb-1">Контакты Исполнителя: <a href="mailto:info@smm-boost.kz" className="text-pink-500 hover:text-pink-400">info@smm-boost.kz</a></p>
          <p className="mb-1">Поддержка: <a href="mailto:support@smm-boost.kz" className="text-pink-500 hover:text-pink-400">support@smm-boost.kz</a>, <a href="tel:+77789836436" className="text-pink-500 hover:text-pink-400">+7 (778) 983 64 36</a></p>
          <p>Юридические вопросы: <a href="mailto:legal@smm-boost.kz" className="text-pink-500 hover:text-pink-400">legal@smm-boost.kz</a></p>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">1. Правовая природа, акцепт и применимое право</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>1.1. Настоящее Пользовательское соглашение (далее — «Оферта») является публичной офертой в смысле ст. 395 ГК РК.</p>
            <p>1.2. Акцептом Оферты является совершение Пользователем действий, направленных на получение услуг Исполнителя через Сервис, включая оформление заказа, оплату, отправку заявки, либо фактическое использование функционала, связанного с заказом услуг. Акцепт должен быть полным и безоговорочным в понимании ст. 396 ГК РК.</p>
            <p>1.3. С момента акцепта между Пользователем и Исполнителем считается заключенным договор на условиях настоящей Оферты.</p>
            <p>1.4. К отношениям сторон применяется право Республики Казахстан.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">2. Термины</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>2.1. «Сервис» — сайт/онлайн-платформа smm-boost.kz и связанные с ним интерфейсы, через которые Пользователь оформляет и оплачивает цифровые услуги.</p>
            <p>2.2. «Услуги» — цифровые услуги Исполнителя, включая услуги в сфере SMM/маркетингового сопровождения и иные услуги, размещенные в Сервисе.</p>
            <p>2.3. «Заказ» — оформленная Пользователем заявка на получение Услуг с выбранными параметрами, ценой и объемом.</p>
            <p>2.4. «Пользователь» — дееспособное физическое лицо, совершающее акцепт Оферты.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">3. Предмет договора</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>3.1. Исполнитель обязуется оказать Пользователю Услуги в соответствии с параметрами выбранного Заказа, а Пользователь обязуется оплатить Услуги.</p>
            <p>3.2. Конкретный перечень, объем, стоимость и иные условия Услуг определяются на страницах Сервиса (в описании услуги/заказа) и являются неотъемлемой частью договора.</p>
            <p>3.3. Услуги оказываются дистанционно с использованием информационных технологий.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">4. Порядок оформления заказа</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>4.1. Для оформления Заказа Пользователь:</p>
            <p>4.1.1. выбирает услугу и ее параметры;</p>
            <p>4.1.2. указывает необходимые данные для оказания услуги (например, ссылки на страницы/аккаунты);</p>
            <p>4.1.3. подтверждает согласие с Офертой и Политикой конфиденциальности;</p>
            <p>4.1.4. производит оплату.</p>
            <p>4.2. Пользователь несет ответственность за корректность предоставленных данных. Неверные/неполные данные могут привести к невозможности или задержке оказания услуг.</p>
            <p>4.3. Исполнитель вправе запросить уточнение данных; сроки оказания услуг продлеваются на период ожидания ответа Пользователя.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">5. Стоимость и порядок оплаты</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>5.1. Стоимость Услуг указывается в Сервисе до момента оплаты и может зависеть от выбранных параметров Заказа.</p>
            <p>5.2. Оплата производится на условиях 100% предоплаты, если иное прямо не указано в Сервисе.</p>
            <p>5.3. Платежи и переводы осуществляются с применением платежной инфраструктуры и регулируются Законом РК «О платежах и платежных системах» от 26.07.2016 № 11-VI.</p>
            <p>5.4. Исполнитель не получает и не хранит полные реквизиты банковской карты Пользователя.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">6. Порядок оказания услуг и результат</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>6.1. Исполнитель приступает к оказанию Услуг после подтверждения оплаты и получения всех необходимых данных.</p>
            <p>6.2. Сроки выполнения зависят от вида услуги, объема, текущей нагрузки, технических ограничений и особенностей сторонних платформ.</p>
            <p>6.3. Услуги в среде сторонних социальных платформ зависят от алгоритмов, правил и ограничений таких платформ. Исполнитель не гарантирует решений сторонних платформ (включая ограничения, модерацию, «чистки» и иные изменения), но обязуется выполнить действия/объем Услуг в рамках параметров Заказа.</p>
            <p>6.4. Результат оказания Услуг считается предоставленным при выполнении Исполнителем действий/объема, предусмотренного Заказом, и/или при достижении показателей в пределах, описанных в условиях конкретной услуги, если такие показатели заявлены Исполнителем в Сервисе.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">7. Права и обязанности сторон</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>7.1. Исполнитель обязуется:</p>
            <p>7.1.1. оказывать Услуги добросовестно и в объеме, соответствующем оплаченному Заказу;</p>
            <p>7.1.2. обеспечивать конфиденциальность и защиту персональных данных в соответствии с Законом о персональных данных;</p>
            <p>7.1.3. предоставлять поддержку по вопросам оформления Заказа и оказания Услуг;</p>
            <p>7.1.4. рассматривать обращения и претензии в порядке, установленном Офертой и Политикой возврата.</p>
            <p>7.2. Пользователь обязуется:</p>
            <p>7.2.1. предоставлять достоверные и корректные данные, необходимые для оказания Услуг;</p>
            <p>7.2.2. соблюдать правила и требования сторонних платформ, а также законодательство РК;</p>
            <p>7.2.3. не использовать Сервис для противоправных целей и нарушений прав третьих лиц;</p>
            <p>7.2.4. своевременно отвечать на запросы Исполнителя, связанные с уточнением данных по Заказу;</p>
            <p>7.2.5. соблюдать условия настоящей Оферты.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">8. Запреты и ограничения</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>8.1. Пользователю запрещается:</p>
            <p>8.1.1. использовать Сервис для распространения незаконного контента;</p>
            <p>8.1.2. нарушать права третьих лиц, включая права на товарные знаки, авторские и смежные права;</p>
            <p>8.1.3. предпринимать действия, направленные на обход ограничений Сервиса, злоупотребление возвратами или введение в заблуждение Исполнителя;</p>
            <p>8.1.4. предоставлять чужие аккаунты/страницы без законного основания.</p>
            <p>8.2. Исполнитель вправе отказать в оказании Услуги или приостановить выполнение Заказа при наличии обоснованных подозрений нарушения Оферты, правил сторонних платформ или законодательства РК.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">9. Возвраты, претензионный порядок и рассмотрение обращений</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>9.1. Порядок и условия возврата регулируются Политикой возврата средств, размещенной на сайте, и применимыми нормами законодательства РК, включая Закон РК «О защите прав потребителей» от 04.05.2010 № 274-IV (при применимости статуса потребителя).</p>
            <p>9.2. Претензии по Заказам направляются на <a href="mailto:support@smm-boost.kz" className="text-pink-500 hover:text-pink-400">support@smm-boost.kz</a> или <a href="mailto:refund@smm-boost.kz" className="text-pink-500 hover:text-pink-400">refund@smm-boost.kz</a> (по вопросам возврата) с указанием номера Заказа, даты оплаты и описанием обстоятельств.</p>
            <p>9.3. Срок рассмотрения обращения/претензии — до 10 (десяти) рабочих дней, если иной срок не установлен законодательством РК или условиями конкретной услуги.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">10. Ответственность сторон</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>10.1. Стороны несут ответственность в соответствии с законодательством РК.</p>
            <p>10.2. Исполнитель не несет ответственности за:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>решения сторонних платформ (блокировки, ограничения, удаление активности, изменение алгоритмов);</li>
              <li>действия/бездействие третьих лиц;</li>
              <li>последствия предоставления Пользователем неверных данных;</li>
              <li>невозможность достижения ожидаемого результата при отсутствии гарантии в условиях услуги и при влиянии внешних факторов, не зависящих от Исполнителя.</li>
            </ul>
            <p>10.3. В пределах, допускаемых законодательством РК, ответственность Исполнителя ограничивается суммой, фактически оплаченной Пользователем за конкретный Заказ, по которому возникла претензия, если иное не установлено императивными нормами закона.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">11. Форс-мажор</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>11.1. Стороны освобождаются от ответственности за неисполнение обязательств вследствие обстоятельств непреодолимой силы, которые стороны не могли предвидеть или предотвратить.</p>
            <p>11.2. Сторона, для которой наступили такие обстоятельства, уведомляет другую сторону в разумный срок.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">12. Изменение Оферты</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>12.1. Исполнитель вправе изменять Оферту в одностороннем порядке. Актуальная редакция размещается на сайте и вступает в силу с момента публикации, если не указано иное.</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">13. Реквизиты и контакты Исполнителя</h2>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>ТОО «White Trade»</p>
            <p>БИН 250140025178</p>
            <p>Республика Казахстан, г. Алматы, Бостандыкский район, ул. Тимирязева 69, 050057</p>
            <p><a href="mailto:info@smm-boost.kz" className="text-pink-500 hover:text-pink-400">info@smm-boost.kz</a></p>
            <p><a href="mailto:support@smm-boost.kz" className="text-pink-500 hover:text-pink-400">support@smm-boost.kz</a></p>
            <p><a href="mailto:legal@smm-boost.kz" className="text-pink-500 hover:text-pink-400">legal@smm-boost.kz</a></p>
            <p><a href="tel:+77789836436" className="text-pink-500 hover:text-pink-400">+7 (778) 983 64 36</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};