const version = '0.59.0'
export const baseUrl = `https://raw.githubusercontent.com/flix/flix/v${version}/examples/`
export const sampleFiles = [
  {
    name: 'concurrency-and-parallelism/spawning-threads.flix',
    file: 'concurrency-and-parallelism/spawning-threads.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-channels-for-message-passing.flix',
    file: 'concurrency-and-parallelism/using-channels-for-message-passing.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-par-yield-recursively.flix',
    file: 'concurrency-and-parallelism/using-par-yield-recursively.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-par-yield.flix',
    file: 'concurrency-and-parallelism/using-par-yield.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-select-with-default.flix',
    file: 'concurrency-and-parallelism/using-select-with-default.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-select-with-timeout.flix',
    file: 'concurrency-and-parallelism/using-select-with-timeout.flix',
  },
  {
    name: 'concurrency-and-parallelism/using-select.flix',
    file: 'concurrency-and-parallelism/using-select.flix',
  },
  {
    name: 'effects-and-handlers/advanced/backtracking.flix',
    file: 'effects-and-handlers/advanced/backtracking.flix',
  },
  {
    name: 'effects-and-handlers/advanced/collatz.flix',
    file: 'effects-and-handlers/advanced/collatz.flix',
  },
  {
    name: 'effects-and-handlers/advanced/nqueens.flix',
    file: 'effects-and-handlers/advanced/nqueens.flix',
  },
  {
    name: 'effects-and-handlers/running-multiple-effects.flix',
    file: 'effects-and-handlers/running-multiple-effects.flix',
  },
  {
    name: 'effects-and-handlers/using-Clock.flix',
    file: 'effects-and-handlers/using-Clock.flix',
  },
  {
    name: 'effects-and-handlers/using-Console.flix',
    file: 'effects-and-handlers/using-Console.flix',
  },
  {
    name: 'effects-and-handlers/using-FileWriteWithResult.flix',
    file: 'effects-and-handlers/using-FileWriteWithResult.flix',
  },
  {
    name: 'effects-and-handlers/using-HttpWithResult.flix',
    file: 'effects-and-handlers/using-HttpWithResult.flix',
  },
  {
    name: 'effects-and-handlers/using-Logger.flix',
    file: 'effects-and-handlers/using-Logger.flix',
  },
  {
    name: 'effects-and-handlers/using-ProcessWithResult.flix',
    file: 'effects-and-handlers/using-ProcessWithResult.flix',
  },
  {
    name: 'effects-and-handlers/using-Random.flix',
    file: 'effects-and-handlers/using-Random.flix',
  },
  {
    name: 'fixpoints/compiler-puzzle.flix',
    file: 'fixpoints/compiler-puzzle.flix',
  },
  {
    name: 'fixpoints/first-class-constraints-and-fixpoints.flix',
    file: 'fixpoints/first-class-constraints-and-fixpoints.flix',
  },
  {
    name: 'fixpoints/pipelines-of-fixpoint-computations.flix',
    file: 'fixpoints/pipelines-of-fixpoint-computations.flix',
  },
  {
    name: 'fixpoints/polymorphic-first-class-constraints.flix',
    file: 'fixpoints/polymorphic-first-class-constraints.flix',
  },
  {
    name: 'fixpoints/railroad-network.flix',
    file: 'fixpoints/railroad-network.flix',
  },
  {
    name: 'functional-style/algebraic-data-types-and-pattern-matching.flix',
    file: 'functional-style/algebraic-data-types-and-pattern-matching.flix',
  },
  {
    name: 'functional-style/effect-polymorphic-functions.flix',
    file: 'functional-style/effect-polymorphic-functions.flix',
  },
  {
    name: 'functional-style/enums-and-parametric-polymorphism.flix',
    file: 'functional-style/enums-and-parametric-polymorphism.flix',
  },
  {
    name: 'functional-style/function-composition-pipelines-and-currying.flix',
    file: 'functional-style/function-composition-pipelines-and-currying.flix',
  },
  {
    name: 'functional-style/higher-order-functions.flix',
    file: 'functional-style/higher-order-functions.flix',
  },
  {
    name: 'functional-style/lists-and-list-processing.flix',
    file: 'functional-style/lists-and-list-processing.flix',
  },
  {
    name: 'functional-style/mutual-recursion-with-full-tail-call-elimination.flix',
    file: 'functional-style/mutual-recursion-with-full-tail-call-elimination.flix',
  },
  {
    name: 'functional-style/pure-and-impure-functions.flix',
    file: 'functional-style/pure-and-impure-functions.flix',
  },
  {
    name: 'imperative-style/copying-characters-into-array-with-foreach.flix',
    file: 'imperative-style/copying-characters-into-array-with-foreach.flix',
  },
  {
    name: 'imperative-style/imperative-style-foreach-loops.flix',
    file: 'imperative-style/imperative-style-foreach-loops.flix',
  },
  {
    name: 'imperative-style/internal-mutability-with-regions.flix',
    file: 'imperative-style/internal-mutability-with-regions.flix',
  },
  {
    name: 'imperative-style/iterating-over-lists-with-foreach.flix',
    file: 'imperative-style/iterating-over-lists-with-foreach.flix',
  },
  {
    name: 'interoperability/anonymous-classes/implementing-java-closeable.flix',
    file: 'interoperability/anonymous-classes/implementing-java-closeable.flix',
  },
  {
    name: 'interoperability/anonymous-classes/implementing-java-runnable.flix',
    file: 'interoperability/anonymous-classes/implementing-java-runnable.flix',
  },
  {
    name: 'interoperability/calling-methods/calling-java-static-methods.flix',
    file: 'interoperability/calling-methods/calling-java-static-methods.flix',
  },
  {
    name: 'interoperability/calling-methods/calling-java-varargs-methods.flix',
    file: 'interoperability/calling-methods/calling-java-varargs-methods.flix',
  },
  {
    name: 'interoperability/exceptions/catching-java-exceptions.flix',
    file: 'interoperability/exceptions/catching-java-exceptions.flix',
  },
  {
    name: 'interoperability/files/checking-if-file-exists-with-java.flix',
    file: 'interoperability/files/checking-if-file-exists-with-java.flix',
  },
  {
    name: 'interoperability/files/reading-a-file-with-java.flix',
    file: 'interoperability/files/reading-a-file-with-java.flix',
  },
  {
    name: 'interoperability/files/writing-a-file-with-java.flix',
    file: 'interoperability/files/writing-a-file-with-java.flix',
  },
  {
    name: 'interoperability/swing/simple-swing-app.flix',
    file: 'interoperability/swing/simple-swing-app.flix',
  },
  {
    name: 'interoperability/swing/swing-dial.flix',
    file: 'interoperability/swing/swing-dial.flix',
  },
  {
    name: 'interoperability/swing/swing-dialog.flix',
    file: 'interoperability/swing/swing-dialog.flix',
  },
  {
    name: 'misc/named-arguments.flix',
    file: 'misc/named-arguments.flix',
  },
  {
    name: 'misc/type-aliases.flix',
    file: 'misc/type-aliases.flix',
  },
  {
    name: 'misc/type-level-programming/track-list-emptiness-with-type-level-booleans.flix',
    file: 'misc/type-level-programming/track-list-emptiness-with-type-level-booleans.flix',
  },
  {
    name: 'misc/type-level-programming/type-level-programming-4bit-adder.flix',
    file: 'misc/type-level-programming/type-level-programming-4bit-adder.flix',
  },
  {
    name: 'misc/type-level-programming/type-level-programming-demorgan.flix',
    file: 'misc/type-level-programming/type-level-programming-demorgan.flix',
  },
  {
    name: 'misc/type-level-programming/type-level-programming-eager-lazy-list.flix',
    file: 'misc/type-level-programming/type-level-programming-eager-lazy-list.flix',
  },
  {
    name: 'misc/type-level-programming/type-level-programming-even-odd-list.flix',
    file: 'misc/type-level-programming/type-level-programming-even-odd-list.flix',
  },
  {
    name: 'misc/type-level-programming/type-level-programming-string-sanitization.flix',
    file: 'misc/type-level-programming/type-level-programming-string-sanitization.flix',
  },
  {
    name: 'modules/companion-module-effect.flix',
    file: 'modules/companion-module-effect.flix',
  },
  {
    name: 'modules/companion-module-enum.flix',
    file: 'modules/companion-module-enum.flix',
  },
  {
    name: 'modules/companion-module-struct.flix',
    file: 'modules/companion-module-struct.flix',
  },
  {
    name: 'modules/companion-module-trait.flix',
    file: 'modules/companion-module-trait.flix',
  },
  {
    name: 'modules/declaring-a-module.flix',
    file: 'modules/declaring-a-module.flix',
  },
  {
    name: 'modules/use-from-a-module-locally.flix',
    file: 'modules/use-from-a-module-locally.flix',
  },
  {
    name: 'modules/use-from-a-module.flix',
    file: 'modules/use-from-a-module.flix',
  },
  {
    name: 'package-manager/hello-library/src/HelloLibrary.flix',
    file: 'package-manager/hello-library/src/HelloLibrary.flix',
  },
  {
    name: 'package-manager/hello-library/test/TestHelloLibrary.flix',
    file: 'package-manager/hello-library/test/TestHelloLibrary.flix',
  },
  {
    name: 'package-manager/hello-world/src/Main.flix',
    file: 'package-manager/hello-world/src/Main.flix',
  },
  {
    name: 'package-manager/hello-world/test/TestMain.flix',
    file: 'package-manager/hello-world/test/TestMain.flix',
  },
  {
    name: 'package-manager/minimal-project/src/Main.flix',
    file: 'package-manager/minimal-project/src/Main.flix',
  },
  {
    name: 'package-manager/project-with-deps/src/Main.flix',
    file: 'package-manager/project-with-deps/src/Main.flix',
  },
  {
    name: 'package-manager/project-with-deps/test/TestMain.flix',
    file: 'package-manager/project-with-deps/test/TestMain.flix',
  },
  {
    name: 'records/polymorphic-record-extension-and-restriction.flix',
    file: 'records/polymorphic-record-extension-and-restriction.flix',
  },
  {
    name: 'records/polymorphic-record-update.flix',
    file: 'records/polymorphic-record-update.flix',
  },
  {
    name: 'records/record-construction-and-use.flix',
    file: 'records/record-construction-and-use.flix',
  },
  {
    name: 'records/the-ast-typing-problem-with-polymorphic-records.flix',
    file: 'records/the-ast-typing-problem-with-polymorphic-records.flix',
  },
  {
    name: 'structs/struct-person.flix',
    file: 'structs/struct-person.flix',
  },
  {
    name: 'structs/struct-tree-monadic.flix',
    file: 'structs/struct-tree-monadic.flix',
  },
  {
    name: 'structs/struct-tree.flix',
    file: 'structs/struct-tree.flix',
  },
  {
    name: 'structs/structs-and-parametric-polymorphism.flix',
    file: 'structs/structs-and-parametric-polymorphism.flix',
  },
  {
    name: 'traits/declaring-a-trait-with-instances.flix',
    file: 'traits/declaring-a-trait-with-instances.flix',
  },
  {
    name: 'traits/deriving-traits-automatically.flix',
    file: 'traits/deriving-traits-automatically.flix',
  },
  {
    name: 'traits/trait-with-associated-effect.flix',
    file: 'traits/trait-with-associated-effect.flix',
  },
  {
    name: 'traits/trait-with-associated-type.flix',
    file: 'traits/trait-with-associated-type.flix',
  },
  {
    name: 'traits/trait-with-higher-kinded-type.flix',
    file: 'traits/trait-with-higher-kinded-type.flix',
  },
]
