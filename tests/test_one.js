import HelloWorld from "../src/hello-world";

QUnit.test("hello test", function(assert) {
    assert.ok( 1 == "1");
});

QUnit.test("HTML test", function(assert) {
    assert.ok( 2 == "2");
});
