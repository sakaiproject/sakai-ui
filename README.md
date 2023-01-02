# Sakai UI

All of Sakai's web components will be hosted in this monorepo. This gives us several benefits:

* A single copy of shared node modules, at the top level, via Lerna's hoisting approach
* A single place to republish all the packages from.
* An easier developer experience across packages, using file linking.
* Easier testing, using the web test runner (Karma under the covers)
