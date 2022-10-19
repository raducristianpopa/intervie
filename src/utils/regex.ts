const regex = {
	EMAIL: new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	),
	ONLY_ALPHA_NUM_DASH_SPACES_DOT: new RegExp(/^[a-zA-z0-9\s-_.]*$/, 'i'),
	ONLY_ALPHA_SPACES: new RegExp(/^[a-zA-Z\s-]*$/, 'i'),
	MIN_ONE_UPPERCASE: new RegExp(/^.*[a-z].*$/),
	MIN_ONE_LOWERCASE: new RegExp(/^.*[A-Z].*$/),
	MIN_ONE_NUMERIC: new RegExp(/^.*\d.*$/),
	MIN_ONE_SPECIAL: new RegExp(
		/^.*[`~<>?,\./!@#$%^&*()\-_+=\"'|{}\[\];:\\].*$/
	)
};

export default regex;
