var app = angular.module('app', []);

// directive that prevents submit if there are still form errors

window.focus = function(selector) {
	// timeout is needed for Chrome (is a bug inapp.directive('validSubmit', [ '$parse', function($parse) {
		return {
			// we need a form controller to be on the same element as this directive
			// in other words: this directive can only be used on a &lt;form&gt;
			require: 'form',
			// one time action per form
			link: function(scope, element, iAttrs, form) {
				form.$submitted = false;
				// get a hold of the function that handles submission when form is valid
				var fn = $parse(iAttrs.validSubmit);
				
				// register DOM event handler and wire into Angular's lifecycle with scope.$apply
				element.on('submit', function(event) {
					scope.$apply(function() {
						// on submit event, set submitted to true (like the previous trick)
						form.$submitted = true;
						// if form is valid, execute the submission handler function and reset form submission state
						if (form.$valid) {
							fn(scope, { $event : event });
							form.$submitted = false;
						}
					});
				});
			}
		};
	}
]);

// handle form submission when the form is completely valid
app.controller('MainCtrl', function($scope) {
  $scope.sendForm = function() {
    alert('form valid, sending request...');
  };
});

// focus on the first input when the page loads Chrome)
	setTimeout(function(){
		$(!!selector ? selector : '[autofocus]:not(:focus)').first().focus();
	}, 1);
};


