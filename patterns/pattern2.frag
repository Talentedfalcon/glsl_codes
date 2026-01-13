#ifdef GL_ES
precision mediump float; 
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, vec2 scale){
    st*=scale;
    return fract(st);
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle)) * st;
    st+=0.5;
    return st;
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.y;
    vec3 color=vec3(0.0);

    color=vec3(sin(u_time*5.),st.x,st.y);
    st=tile(st,vec2(5.));
    st=rotate2D(st,0.5*cos(u_time)+0.5);

    color*=vec3(solid_rect(st,vec2(.5*sin(u_time)+0.5),0.5,0.5));

    gl_FragColor=vec4(color,1.0);
}