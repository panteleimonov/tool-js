/*jslint devel: true, continue: true, eqeq: true, plusplus: true, maxlen: 88*/

/* Tool JS Framework version 1.07.04
************************************
*/


var _t = Object.create(null);



/** _t.get() :: селектор DOM-елемента
****************************************************************************************
* Принимает строку в виде инентификатора, тега или атрибута name
* Пример:
* var element = _t.get('#heder-wrap');
* var element = _t.get('<h1>');
* var element = _t.get('btn-submit');
****************************************************************************************
*/
_t.get = function (a) {
	'use strict';
	if (typeof a === 'string') {
		if (a[0] === '#') {
			return document.getElementById(a.substring(1));
		} else if (a[0] === '.') {
			return document.querySelectorAll(a);
		} else if (a[0] === '<' && a[a.length - 1] === '>') {
			return document.getElementsByTagName(a.substring(1, a.length - 1));
		} else {
			return document.getElementsByName(a);
		}
	}
	return a;
};



/** Кросс. addEventListener :: _t.addEvent(переменная, соб-е, ф-я, бул)
****************************************************************************************
JS модуль, который поможет привязывать обработчики событий для элементов с
использованием модели DOM Level 2, если она доступна или с помощью
событий IE, если DOM Level 2 не поддерживается браузером.
Принимает переменную или идентификатор.
****************************************************************************************
*/
_t.addEvent = function (element, eventType, func, boolean) {
	'use strict';
	if (typeof element === 'string') {
		element = _t.get(element);
	}
	if (window.addEventListener) {
		element.addEventListener(eventType, func, boolean);
	} else if (window.attachEvent) {
		element.attachEvent('on' + eventType, func);
	}
};



/** Кросс. removeEventListener :: _t.removeEvent(переменная, соб-е, ф-я, бул)
****************************************************************************************
JS модуль, который поможет привязывать обработчики событий для элементов с
использованием модели DOM Level 2, если она доступна или с помощью
событий IE если DOM Level 2 не поддерживается браузером.
Принимает переменную или идентификатор.
****************************************************************************************
*/
_t.removeEvent = function (element, eventType, func, boolean) {
	'use strict';
	if (typeof element === 'string') {
		element = _t.get(element);
	}
	if (window.addEventListener) {
		element.removeEventListener(eventType, func, boolean);
	} else if (window.attachEvent) {
		element.detachEvent('on' + eventType, func);
	}
};



/** :: _t.DOMPosition(a, b)
****************************************************************************************
*
*
****************************************************************************************
*/
_t.DOMPosition = function (nodeA, nodeB) {
	'use strict';

	if (nodeA.parentNode === nodeB) {
		return 'IS CHILD';
	} else if (nodeB.parentNode === nodeA) {
		return 'IS PARENT';
	}

	switch (nodeA.compareDocumentPosition(nodeB)) {
	case 0:
		return 'THIS NODE'; // nodeA и nodeB - один и тот же узел
	case 1:
		return false; // Узлы в разных документах (или один из них не в документе)
	case 2:
		return 'IS AFTER'; // nodeB предшествует nodeA
	case 4:
		return 'IS BEFORE'; // nodeA предшествует nodeB
	case 10:
		return 'IS ...CHILD'; // nodeA потомок nodeB
	case 20:
		return 'IS ...PARENT'; // nodeA предок nodeB
	default:
		console.log('compareDocumentPosition error');
		console.log(nodeA);
		console.log(nodeB);
	}
};



/** Проверка на цифры (true для строки из цифр) :: _t.isDigit(a)
****************************************************************************************
* Пример: _t.isDigit('007') --> true | _t.isDigit('0.07') --> true
* Для проверки строки на число можно использовать функцию isNaN(str).
* Она преобразует строку в число аналогично +, а затем вернёт true, если это
* NaN, т.е. преобразование не удалось. Но у такой проверки есть особенности:
* - Пустая строка и строка из пробельных символов преобразуются к 0.
* - Если применить такую проверку не к строке, то могут быть сюрпризы,
* в частности isNaN посчитает числами значения false, true, null, так как
* они хотя и не числа, но преобразуются к ним.
****************************************************************************************
*/
_t.isDigit = function (a) {
	'use strict';
	return !isNaN(parseFloat(a)) && isFinite(a);
};



/** Проверка на число (true для нормального числа) :: _t.isNumber(a)
****************************************************************************************
* Пример: _t.isNumber('007') --> false | _t.isNumber('0.07') --> true
* Для проверки строки на число можно использовать функцию isNaN(str).
* Она преобразует строку в число аналогично +, а затем вернёт true, если это
* NaN, т.е. преобразование не удалось. Но у такой проверки есть особенности:
* - Пустая строка и строка из пробельных символов преобразуются к 0.
* - Если применить такую проверку не к строке, то могут быть сюрпризы,
* в частности isNaN посчитает числами значения false, true, null, так как
* они хотя и не числа, но преобразуются к ним.
****************************************************************************************
*/
_t.isNumber = function (a) {
	'use strict';
	if (typeof a === 'string' && a.length > 2 && a[0] === '0' && a[1] !== '.') {
		return false;
	}
	return !isNaN(parseFloat(a)) && isFinite(a);
};



/** Получение CSS-стиля любого элемента :: _t.getStyle(element, styleName)
****************************************************************************************
* Получает аргументы в виде:
* - переменной;
* - названия ID-элемента: '#myIdName';
****************************************************************************************
*/
_t.getStyle = function (element, styleName) {
	'use strict';
	if (typeof element === 'string') {
		element = _t.get(element);
	}
	if (window.getComputedStyle) {
		return window.getComputedStyle(element, null)[styleName];
	} else if (element.currentStyle) {
		return element.currentStyle[styleName];
	}
};




/** _t.randomNumber() возвращает случайное значение из заданного диапазона
****************************************************************************************
*/
_t.randomNumber = function (min, max) {
	'use strict';
	return Math.floor(Math.random() * (max - min + 1)) + min;
};



/** Валидатор формы _t.formValidator(settings)
****************************************************************************************
* 1. Добавляет для input-елементов формы события по интерактивной валидации вводимой
*    пользователем информации. Переключает CSS-классы по результатам этой валидации.
* 2. Возвращает готовую функцию, которая валидирует все необходимые input-елементы этой
*    формы, после чего отменяет или разрешает вызвавшее ее событие (submit, click).
* ВАЖНО: обрабатывает елементы формы, имеющие атрибут 'data-use-validator'
****************************************************************************************
* Принимает в виде аргумента объект, свойства которого и есть настройками валидатора:
* form -> форма, для которой нужно реализовать сценарий валидации.
*         Принимает переменную, идентификатор или имя(name) формы.
* validName -> класс, который валидатор должен присвоить каждому input, который
*              успешно прошел валидацию.
* notValidName -> класс, который валидатор должен присвоить каждому input,
*                 который не смог пройти валидацию.
* patterns -> необязательный аргумент. Объект с пользовательскими RegExp-шаблонами для
*             конкретных name или type. Валидатор также имеет свой набор паттернов.
*             Приоритет выбора RegExp-шаблона для каждого элемента формы следующий:
*             пользовательский name / пользовательский type / встроенный type
* someMustBeChecked -> true, если хотя бы один из чекбоксов данной формы, имеющий
*                      атрибут 'data-use-validator', должен быть активирован.
* validEvent -> функция, которую валидатор должен запустить непосредственно перед
*                  submit-событием, если поля ввода прошли валидацию.
* notValidEvent -> функция, которую валидатор должен запустить в случае отмены
*                  submit-события по причине неправильно заполненых полей ввода.
* Пример использования:
*   var myPatterns = { 'mail': \b[A-za-z0-9._]+@[A-za-z0-9]+\.[A-za-z]{2,4}\b };
*       myValidator = _t.formValidator({ form: '#myForm', patterns: myPatterns });
*	mySubmitBtn.addEventListener('click', myValidator);
*       ... или ...
*	myForm.addEventListener('submit', myValidator);
****************************************************************************************
*/
_t.formValidator = function (settings) {
	'use strict';
	var form              = settings.form,
		validClass        = settings.validClass || 'valid',
		notValidClass     = settings.notValidClass || 'not-valid',
		equalPassClass    = settings.equalPassClass || 'equal-pass',
		notEqualPassClass = settings.notEqualPassClass || 'not-equal-pass',
		equalPassEvent    = settings.equalPassEvent,
		notEqualPassEvent = settings.notEqualPassEvent,
		validEvent        = settings.validEvent,
		notValidEvent     = settings.notValidEvent,
		someMustBeChecked = settings.someMustBeChecked || false,
		customPatterns    = settings.patterns || {},
		defaultPatterns   = {
			text: /\S{1,}/,
			textarea: /\S{1,}/,
			password: /\S{1,}/,
			email: /\b[a-z0-9._]+@[a-z0-9]+\.[a-z]{2,4}\b/i,
			tel: /\d\b/
		},
		checkboxCounter = 0,
		passwords = [],
		lastPassEvent,
		input,
		len,
		i;

	// Функция для проверки того, нужно ли валидатору следить за инпутом
	function isRequired(elm) {
		return elm.hasAttribute('data-use-validator');
	}//---isRequired()

	function patternSetter(elm) {
	// Анализирует input и определяет рабочий шаблон по следующему приоритету:
	// 1 - пользовательский regEx-шаблон из атрибута pattern, указанного в HTML
	// 2 - пользовательский шаблон для этого name из объекта customPatterns
	// 3 - пользовательский шаблон для этого type из объекта customPatterns
	// 4 - внутренний шаблон для данного type (предусмотренный в defaultPatterns)
		if (elm.getAttribute('pattern')) {
			return new RegExp(elm.getAttribute('pattern'));
		} else if (customPatterns[elm.name] || customPatterns[elm.type]) {
			return customPatterns[elm.name] || customPatterns[elm.type];
		} else {
			return defaultPatterns[elm.type];
		}
	}//---patternSetter()


	function passValidator(e) {
		if (passwords.length !== 2) {
			return;
		}

		function removeAllEqualStyles() {
			passwords[0].classList.remove(notEqualPassClass);
			passwords[1].classList.remove(notEqualPassClass);
			passwords[0].classList.remove(equalPassClass);
			passwords[1].classList.remove(equalPassClass);
		}//---removeAllEqualStyles()

		if (e.type === 'blur') {
			// Проверяем совпадение паролей после события blur только в том случае,
			// если ему не предшевствует событие change. Например, несовпадающий пароль
			// был снова введен в поле ввода после очистки стилей событием keydown.
			// В таком случае change не срабатывает и поэтому проверки паролей нет,
			// но ее нужно запустить. Исли перед blur был keydown - это такой случай.
			if (lastPassEvent === 'blur' || lastPassEvent === 'change') {
				lastPassEvent = e.type;
				return;
			}
		}
		lastPassEvent = e.type;
		if (e.type === 'keydown') {
			removeAllEqualStyles();
			return;
		}
		//отменяем стили сравнения паролей, если одно из password-полей незаполнено:
		if (!passwords[0].value || !passwords[1].value) {
			removeAllEqualStyles();
			return;
		}
		//если пароли равны:
		if (passwords[0].value === passwords[1].value) {
			passwords[0].classList.remove(notEqualPassClass);
			passwords[1].classList.remove(notEqualPassClass);
			passwords[0].classList.add(equalPassClass);
			passwords[1].classList.add(equalPassClass);
			if (settings.equalPassEvent) {
				equalPassEvent();
			}
			return;
		}
		//на этом шаге уже очевидно, что оба пароля введены, но не равны друг другу
		passwords[0].classList.remove(equalPassClass);
		passwords[1].classList.remove(equalPassClass);
		passwords[0].classList.add(notEqualPassClass);
		passwords[1].classList.add(notEqualPassClass);
		if (settings.notEqualPassEvent) {
			notEqualPassEvent();
		}
	}//---passValidator()

	function inputValidator(e) {
		// доступ к инпуту через объект собития или "прямую" переменную
		var input = e.target || e;
		if (!input.patternToUse.test(input.value)) {
			input.classList.remove(validClass);
			input.classList.add(notValidClass);
		} else {
			input.classList.remove(notValidClass);
			input.classList.add(validClass);
		}
	}//---inputValidator()

	function checkboxValidator(e) {
		var input = e.target || e;
		if (input.checked) {
			input.classList.remove('not-checked');
			input.classList.add('checked');
		} else {
			input.classList.remove('checked');
			input.classList.add('not-checked');
		}
	}//---checkboxValidator()

	function onblurEvent(e) {
		if (e.target.value) {
			inputValidator(e.target);
		}
	}//---onblurEvent()

	function onfocusCleaner(e) {
	// при установке курсора в поле ввода отменяет все его "валидационные" стили
		if (e.target.classList.contains(validClass)) {
			e.target.classList.remove(validClass);
		} else if (e.target.classList.contains(notValidClass)) {
			e.target.classList.remove(notValidClass);
		}
	}//---onfocusCleaner()

	// привязка валидаторов и паттернов для инпутов в соответствии с их типом
	for (i = 0, len = form.elements.length; i < len; i++) {
		input = form.elements[i];
		if (input.type === 'checkbox') {
			checkboxCounter++;
			input.addEventListener('change', checkboxValidator);
		} else if (isRequired(input)) {
			input.patternToUse = patternSetter(input);
			input.addEventListener('focus', onfocusCleaner);
			input.addEventListener('blur', onblurEvent);
			if (input.type === 'password') {
				passwords.push(input);
				input.addEventListener('change', passValidator);
				input.addEventListener('blur', passValidator);
				input.addEventListener('keydown', passValidator);
			}
		}
	}

	// returned-функция для обработчика submit-события формы
	return function (e) {
		var formIsValid = true,
			someChecked = 0,
			currentInput;
		// запускаем валидатор для каждого элемента формы
		for (i = 0, len = form.elements.length; i < len; i++) {
			currentInput = form.elements[i];
			if (currentInput.type === 'checkbox') {
				if (!isRequired(currentInput) && !someMustBeChecked) {
					continue;
				}
				checkboxValidator(currentInput);
				if (currentInput.classList.contains('checked')) {
					someChecked++;
				} else if (currentInput.classList.contains('not-checked')) {
					formIsValid = false;
				}
			} else if (isRequired(currentInput) && currentInput.value) {
				inputValidator(currentInput);
				// Валидатор обработал элемент. Теперь проверим какой class он присвоил
				if (currentInput.classList.contains(notValidClass)) {
					formIsValid = false;
				}
				if (currentInput.classList.contains(notEqualPassClass)) {
					formIsValid = false;
				}
			}
		}
		if (someMustBeChecked && checkboxCounter && !someChecked) {
			formIsValid = false;
		}
		if (!formIsValid) {
			e.preventDefault();
			if (typeof notValidEvent === 'function') {
				notValidEvent();
			}
		} else if (typeof validEvent === 'function') {
			validEvent();
		}
	};//---returned-функция для обработчика submit-события формы

};//---_t.formValidator



/** Скрытие и возврат плейсхолдеров | _t.togglePlaceholders()
****************************************************************************************
* Скрытие плейсхолдеров при фокусе курсора в поле ввода.
* Возврат плейсхолдера, если не было введено данных.
* Например:
* window.addEventListener('load', _t.togglePlaceholders, true);
* Автоматически добавит сценарий всем тегам input, имеющим атрибут placeholder.
****************************************************************************************
*/
_t.togglePlaceholders = function () {
	'use strict';
	var allForms = document.forms,
		i,
		j,
		currentForm,
		input,
		placeholder = '',
		len;

	function blurInput(e) {
		placeholder = e.target.getAttribute('data-placeholder');
		if (!e.target.getAttribute('placeholder')) {
			e.target.setAttribute('placeholder', placeholder);
		}
	}

	function focusInput(e) {
		if (e.target.getAttribute('placeholder')) {
			e.target.setAttribute('placeholder', '');
		}
	}

	for (i = 0; i < allForms.length; i++) {
		currentForm = allForms[i];
		len = currentForm.elements.length;

		for (j = 0; j < len; j++) {
			input = currentForm.elements[j];
			placeholder = input.getAttribute('placeholder');
			if (!placeholder) {
				continue;
			}

			input.setAttribute('data-placeholder', placeholder);
			_t.addEvent(input, 'blur', blurInput, false);
			_t.addEvent(input, 'focus', focusInput, false);
		}
	}
};



/** _t.addProto(p1, p2) | Задание prototype.__proto__ с сохранением constructor
****************************************************************************************
* В prototype по умолчанию всегда находится свойство constructor, указывающее
* на функцию-конструктор. Если мы рассчитываем использовать это свойство, то
* при замене prototype через Object.create нужно его явно сохранить:
****************************************************************************************
*/
_t.addProto = function (p1, p2) {
	'use strict';
	p1.prototype = Object.create(p2);
	p1.prototype.constructor = p1;
};



/** _t.alignByHeight(rel) | Выравнивание по центру относительно высоты элемента
****************************************************************************************
* Выравнивает абсолютно спозиционированные элементы по центру относительно
* высоты другого елемента. Управляет свойствами top и margin-top целевых эл-тов.
* - Первый аргумент - элемент, относительно которого нужно изменять top.
* - Последующие аргументы - элементы, свойством top которых нужно управлять, они
* должны явно иметь position absolute.
* Метод отслеживает свойство height первого элемента.
****************************************************************************************
*/
_t.alignByHeight = function (rel) {
	'use strict';
	var mainArguments = arguments,
		len = arguments.length,
		i,
		j;

	function heightCalc(element) {
		if (window.getComputedStyle) {
			return parseFloat(window.getComputedStyle(element, null).height);
		} else if (element.currentStyle) {
			return parseFloat(element.currentStyle.height);
		}
	}

	function newVerticalPosition() {
		var elmt,
			elmtHeight,
			relativeHeight = heightCalc(rel);
		for (i = 1; i < len; i++) {
			//mainArguments[0] is 'relative' element
			elmt = mainArguments[i];
			if (elmt.length) {
				for (j = 0; j < elmt.length; j++) {
					elmtHeight = heightCalc(elmt[j]);
					elmt[j].style.top = (relativeHeight / 2 - elmtHeight / 2) + 'px';
				}
			} else {
				elmtHeight = heightCalc(elmt);
				elmt.style.top = (relativeHeight / 2 - elmtHeight / 2) + 'px';
			}
		}
	}

	newVerticalPosition();
	setTimeout(newVerticalPosition, 300); //Fix for window's resize time delay
};



/** _t.toggleClassName(elmt, className) | Переключение CSS-класса для елемента
****************************************************************************************
* Если класса нет - добавить. Если есть - удалить.
****************************************************************************************
*/
_t.toggleClassName = function (elmt, className) {
	'use strict';
	if (elmt.classList.contains(className)) {
		elmt.classList.remove(className);
	} else {
		elmt.classList.add(className);
	}
};



/** _t.addClassNameButton(btn, elmt, obj) | Создание переключателя классов
****************************************************************************************
* btn  - кнопка
* elmt - управляемый элемент
****************************************************************************************
*/
_t.addClassNameButton = function (btn, elmt, obj) {
	'use strict';
	function trigger() {
		if (obj.buttonClassName) {
			_t.toggleClassName(btn, obj.buttonClassName);
		}
		_t.toggleClassName(elmt, obj.elementClassName);
	}
	_t.addEvent(btn, 'click', trigger);
};
