./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals --excludePrivate --excludeProtected \
	--out ./doc/latest \
	./resource-configuration/v1.ts \
	--target "ES5" 

find doc/ -type f -exec sed -i -e "s|Defined in $PWD|Defined in |g" {} \;
