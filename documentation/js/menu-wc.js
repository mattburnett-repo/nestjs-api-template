'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">NestJS API Template</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' : 'data-target="#xs-controllers-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' :
                                            'id="xs-controllers-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' : 'data-target="#xs-injectables-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' :
                                        'id="xs-injectables-links-module-AppModule-555a8754c109d3d5424ef4a0bea43ee3679d34a013692f5396419a26ca2731631c5b54f47f4cdb459c059e7030f485279b15be1dea29d09b1d9a2a60d83b1d39"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' : 'data-target="#xs-controllers-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' :
                                            'id="xs-controllers-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' : 'data-target="#xs-injectables-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' :
                                        'id="xs-injectables-links-module-AuthModule-6c17f67254ad204030f5e4125fd118eb97a45102456f304a3463a5b25cc70eb80c9558ffba865dba84ccbb29de6a71ba798ed9110aa3dbaece77b50dbcb40e2e"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExampleModule.html" data-type="entity-link" >ExampleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' : 'data-target="#xs-controllers-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' :
                                            'id="xs-controllers-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' }>
                                            <li class="link">
                                                <a href="controllers/ExampleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' : 'data-target="#xs-injectables-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' :
                                        'id="xs-injectables-links-module-ExampleModule-3787cee0e2a718e7034434d970d7b6cba6f0d83a31f6e2216bdccc101d915a03adde9ee4c15cbde9ef1abde332615daa3770ad2fac1072be23feb4cddba5a037"' }>
                                        <li class="link">
                                            <a href="injectables/ExampleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' : 'data-target="#xs-controllers-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' :
                                            'id="xs-controllers-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' : 'data-target="#xs-injectables-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' :
                                        'id="xs-injectables-links-module-UsersModule-682b0404d7b2d14d287a1afb538b3f75e670d1c9a805c7471b5fcabcc04df335e8cec0a3932bcc07c5fb9a04b1adfd3219eeb9dac6f11bbf1a72bcfefbfa0bdf"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Example.html" data-type="entity-link" >Example</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExampleDto.html" data-type="entity-link" >CreateExampleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExampleSeeder.html" data-type="entity-link" >ExampleSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExampleDto.html" data-type="entity-link" >UpdateExampleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSeeder.html" data-type="entity-link" >UserSeeder</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});