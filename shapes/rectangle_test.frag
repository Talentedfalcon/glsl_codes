#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    vec3 color=vec3(0.0);
    
    float border_width=0.1;

    vec2 bl=step(vec2(border_width),st);
    vec2 tr=step(vec2(border_width),1.0-st);

    color=vec3(bl.x*bl.y*tr.x*tr.y);

    gl_FragColor=vec4(color.r*0.5,color.g*st.x,color.b*st.y,1.0);
}