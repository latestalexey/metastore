# Объединение библиотеки _Интеграция_ с типовыми конфигурациями 1С

### Если исходная конфигурация на полной поддержке, включить возможность внесения изменений
- В конфигураторе `Конфигурация` -> `Поддержка` -> `Настройка поддержки` -> `Включить возможность внесения изменений`
- В диалоге `Режим поддержки` указать режим `Объекты поставщика не редактируются`

### Включить возможность изменения следующих объектов исходной конфигурации
- Корень дерева конфигурации для возможности добавления новых объектов
- Роли  `ПолныеПрава` и `УдаленныйДоступСтандартныйИнтерфейсOData`
- Общий реквизит `ОбластьДанныхОсновныеДанные`

### Выполнить объединение с конфигурацией _Интеграция_ с постановкой на поддержку
- В конфигураторе `Конфигурация` -> `Сравнить - объединить с конфигурацией из файла`
- В диалоге `Поставить на поддержку?` ответить `Да`
- В диалоге `Сравнение, объединение`
	+ Снять все `флажки` в разделе `Свойства` (Имя, Синоним, Основные роли и т.д.) 
	+ Для ролей `ПолныеПрава` и `УдаленныйДоступСтандартныйИнтерфейсOData` указать режим `Объединить с приоритетом основной конфигурации`
	+ Для общего реквизита `ОбластьДанныхОсновныеДанные` указать режим `Объединить`
- В диалоге `Настройка правил поддержки`, который появляется после выполнения команды `Объединить`
	+ Для новых и существующих идентичных объектов поставщика, установить режим `Не редактируется`
	+ Для изменённых объектов поставщика установить режим `Редактируется с сохранением поддержки`
	
# Обновление типовой конфигурации 1С, в которую внедрена библиотека _Интеграция_
Несколько объектов библиотеки _Интеграция_ пересекаются с объектами типовой конфигурации.
Избавиться от такого пересечения не представляется возможным при текущей архитектуре БСП и БТС.

### Порядок обновления
- Создать резервную копию информационной базы
- Для обновления использовать команду `Конфигурация` -> `Поддержка` -> `Обновить конфигурацию`
- В окне сравнения и объединения конфигураций для общих объектов (Роли `ПолныеПрава` и `УдаленныйДоступСтандартныйИнтерфейсOData` и Общий реквизит `ОбластьДанныхОсновныеДанные`), использовать значения, подставляемые конфигуратором по умолчанию. Если были изменения этих объектов в конфигурации поставщика - `Взять из новой конфигурации поставщика`. Если изменений не было - `не объединять`
- Если обновление типовой конфигурации не содержало изменений общих объектов, дополнительных действий не требуется - можно сохранить изменения конфигурации и обновить конфигурацию информационной базы
- Если обновлени содержало изменения общих объектов (Роли `ПолныеПрава` и `УдаленныйДоступСтандартныйИнтерфейсOData` и Общий реквизит `ОбластьДанныхОсновныеДанные`), после закрытия диалога сравнения - объединения, необходимо:
	+ Сохранить изменения конфигурации, но не применять эти изменения к информационной базе. Если в информационной базе не включено разделение данных, применение изменений в этом месте никакого вреда данным не нанесёт, но если обновляется база во фреше или локальном сервере с включенным режимом разделения данных - можно испортить информацию регистров сведений библиотеки интеграции
	+ Выполнить `Конфигурация` -> `Поддержка` -> `Настройка поддержки`, в выпадающем списке конфигураций поставщиков выбрать `ОкнософтИнтеграцияЛайт` и нажать кнопку `Сравнить, объединить` в нижней части диалога настройки поддержки
	+ После открытия диалога сравнения и объединения, для общих объектов (Роли `ПолныеПрава` и `УдаленныйДоступСтандартныйИнтерфейсOData` и Общий реквизит `ОбластьДанныхОсновныеДанные`), установить соответственно, `Объединить с приоритетом основной конфигурации` и `Объединить`
	+ Выполнить объединение, сохранить конфигурацию и применить изменения к информционной базе
