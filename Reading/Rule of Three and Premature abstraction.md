# Rule of Three and Premature abstraction

When an interface is design to do one thing and need to be expanded to do two things, the total needed efforts or amount of code by default will be at least three fold.  The efforts will include doing the each of the things AND making sure the interface can route the handling properly.  The last part is almost always more complex that actually doing each thing by itself.

That is why, in general, it is not a good idea to have a common interface abstracted out when the first duplication is found.

The right time, in general, to abstract a common interface or object is when the same duplication is needed for the third time.  Even at this time, one should do an abstraction if and only if:

1. The common parts are significant so duplication removal is worthwhile.
2. How the differences can be handled is simple and clear.  For example, it is clear that it should be handled by delegation or inheritance, 
3. the project’s structure is set up that such shared component can be extracted without adding more code and effort to make the abstraction work. For example, if the code has to be extracted into another code repository and be accessed through a library, then even three duplications are not worthwhile.

 For such level of abstraction, one must insist that the extracted “thing” is truly independent and orthogonal to the tasks at hand such like logging.