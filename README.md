# koui - KnockoutJS UI

A collection of simple UI components developed using KnockoutJS, jQuery and Underscore for minimum filesize and maximum
flexibility.

KOUI does not contain any styling. It is easy to get styling using e.g. Bootstrap.

## Widgets

+ Scoped View Dependable
+ Panel
+ Tab Panel
+ Simple Table
+ Accordion
+ Dropdown Button


### Scoped View Dependable

Scoped view dependables enables bindings between view components without involving a view-model.

    <div data-bind="ui-vars: {showModal: false}">
      <a href="#" data-bind="hover: showModal">Some link</a>
      <div data-bind="visible: showModal">
      </div>
    </div>

Using `ui-vars`.

### Panel

    <div class="alert" data-bind="ui-panel: {time: 200, isExpanded: false}">
        <h4><i data-bind="css: {'icon-arrow-down': !isExpanded() , 'icon-arrow-up': isExpanded() } "></i>Ipsum
        </h4>

        <div>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.</div>
    </div>

Using `ui-panel`.
Will bind the first child as panel header and the second child as panel body.

The panel supplies an observable `isExpanded` that signals if the panel is expanded or not.


### Tab Panel

    <div data-bind="ui-tabpanel: {active: 'active'}">
        <ul class="nav nav-tabs">
            <li><a>First</a></li>
            <li><a>Second</a></li>
        </ul>
        <div class="hero-unit">Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.</div>

        <div class="hero-unit">Cum horribilem walking dead resurgere de crazed sepulcris creaturis</div>
    </div>

Using `ui-tabpanel`.
Will by default bind the n:th menu alternative to the n:th div.
Configurations are:

    {String} active extra class name

### Accordion

    <div data-bind="ui-accordion: {}">
      <div>
        <h2>First</h2>
        <div>First</div>
      </div>
      <div>
        <h2>Second</h2>
        <div>Second</div>
      </div>
    </div>

Using `ui-accordion`.

### Table

    <div>
        <div style="height: 100px; overflow-y: scroll;">
            <table class="table table-striped" data-bind="ui-table: {scroll: true}">
                <thead>
                <th style="width: 100px;">FOO</th>
                <th style="width: 100px;">BAR</th>
                </thead>
                <tbody data-bind="foreach: data">
                <tr>
                    <th style="width: 100px;" data-bind="text: key"></th>
                    <td style="width: 100px;" data-bind="text: value"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

Using `ui-table`.

### Dropdown Button

    <div data-bind="ui-dropdown: {active: 'open'}" class="btn-group">
        <a class="btn dropdown-toggle" data-toggle="dropdown">
            Action
            <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
            <li><a href="#">First</a></li>
            <li><a href="#">Second</a></li>
        </ul>
    </div>

Using `ui-dropdown`.

Configurations are:

    {String} active class.

